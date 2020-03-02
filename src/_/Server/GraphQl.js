import { buildSchema } from 'graphql';
import graphqlHTTP from 'express-graphql';

/**
 * GraphQl server
 */
export default class GraphQl {
    /**
     * Express server
     *
     * @type {object|null}
     */
    express = null;

    /**
     * Path to resolvers
     *
     * @type {string}
     */
    resolversPath = '';

    /**
     * GraphQL constructor
     *
     * @param express
     * @param resolversPath
     */
    constructor(express, resolversPath) {
        this.express = express;
        this.resolversPath = resolversPath;
    }

    /**
     * Inject GQL into express
     */
    initialize() {
        this.express.use('/graphql', graphqlHTTP({
            schema: this.prepareSchema(),
            rootValue: this.prepareRoot(),
            graphiql: true
        }));
    }

    /**
     * Load all schemas
     *
     * @return {string}
     */
    loadSchema() {
        return 'type Query { test: String }';
    }

    /**
     * Build schema
     *
     * @return {GraphQLSchema}
     */
    prepareSchema() {
        return buildSchema(this.loadSchema());
    }

    /**
     * Prepare resolvers
     *
     * @return {{}}
     */
    prepareRoot() {
        return {};
    }
}
