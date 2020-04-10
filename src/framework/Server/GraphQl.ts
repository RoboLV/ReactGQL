import graphqlHTTP from 'express-graphql';
import {buildSchema, GraphQLSchema, defaultFieldResolver, GraphQLResolveInfo, getDirectiveValues} from 'graphql';
import fs from 'fs';
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
            fieldResolver: this.fieldResolver.bind(this),
            graphiql: true
        }));
    }

    /**
     * Load all schemas
     *
     * @return {string}
     */
    protected _loadSchema(): string {
        const baseSchema = fs.readFileSync( 'dist/framework/resources/server/schema.graphqls');

        return baseSchema + '';

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

    /**
     * Resolve resolver
     *
     * @param source
     * @param args
     * @param context
     * @param info
     */
    protected fieldResolver(source: any, args: any, context: any, info: GraphQLResolveInfo) {
        const fieldDef = info.parentType.getFields()[info.fieldName];
        const resolverDirective = info.schema.getDirective('resolver');
        const resolverValue = getDirectiveValues(resolverDirective, fieldDef.astNode);

        if (resolverValue.class) {
            return null;
        }

        return defaultFieldResolver(source, args, context, info);
    }
}

