import graphqlHTTP from 'express-graphql';
import {buildSchema, GraphQLSchema} from 'graphql';
import { App } from "@framework";

/**
 * Express GraphQL Wrapper and interface
 */
export class GraphQl {
    /**
     * App reference
     */
    private _app: App;

    /**
     * Constructor
     *
     * @param app
     */
    constructor(app: App) {
        this._app = app;
    }

    /**
     * Connect express graphQL
     *
     * @private
     */
    public initialize(): void {
        this._app.express.use('/graphql', graphqlHTTP({
            schema: this._prepareSchema(),
            rootValue: this._prepareRoot(),
            graphiql: true
        }));
    }

    /**
     * Load all schemas
     *
     * @return {string}
     */
    protected _loadSchema(): string {
        return 'type Query { test: String }';
    }

    /**
     * Build schema
     *
     * @return {GraphQLSchema}
     */
    protected _prepareSchema(): GraphQLSchema {
        return buildSchema(this._loadSchema());
    }

    /**
     * Prepare resolvers
     *
     * @return {{}}
     */
    protected _prepareRoot() {
        return {};
    }
}

