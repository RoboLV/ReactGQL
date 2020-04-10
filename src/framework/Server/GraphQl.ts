import graphqlHTTP from 'express-graphql';
import {
    buildSchema, GraphQLSchema, defaultFieldResolver, GraphQLResolveInfo, getDirectiveValues, extendSchema, parse
} from 'graphql';
import fs from 'fs';
import { App } from "@framework";
import {BaseResolverInterface} from "@framework/Server/Resolver/BaseResolverInterface";

/**
 * Express GraphQL Wrapper and interface
 */
export class GraphQl {
    /**
     * App reference
     */
    private _app: App;

    /**
     * Resolved resolvers
     */
    private resolvers: {[key: string]: BaseResolverInterface} = {};

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
            fieldResolver: this._fieldResolver.bind(this),
            graphiql: true
        }));
    }

    /**
     * Load all schemas
     *
     * @return {string[]}
     */
    protected _loadSchema(): string[] {
        const schema = [];
        schema.push(fs.readFileSync( 'dist/framework/resources/server/schema.graphqls').toString());

        this._app.moduleManager.getModuleNameList().forEach((moduleName) => {
            this._app.moduleManager
                .getModule(moduleName)
                .requireResource(
                    'etc/schema.graphqls',
                    (content) => schema.push(content),
                    false
                );
        });

        return schema;

    }

    /**
     * Build schema
     *
     * @return {GraphQLSchema}
     */
    protected _prepareSchema(): GraphQLSchema {
        const schemaParts = this._loadSchema();
        const mainSchema = schemaParts.shift();
        const rootSchema = buildSchema(mainSchema);

        return schemaParts.reduce((root, sub) => {
            root = extendSchema(root, parse(sub));

            return root;
        }, rootSchema);
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
    protected _fieldResolver(source: any, args: any, context: any, info: GraphQLResolveInfo) {
        const fieldDef = info.parentType.getFields()[info.fieldName];
        const resolverDirective = info.schema.getDirective('resolver');
        const resolverValue = getDirectiveValues(resolverDirective, fieldDef.astNode);

        if (resolverValue && resolverValue.class) {
            if (!this.resolvers[resolverValue.class]) {
                const classPath = resolverValue.class.split('.');
                const vendor = classPath.shift();
                const moduleName = classPath.shift();
                const module = this._app.moduleManager.getModule([vendor, moduleName].join('.'));

                // @ts-ignore
                const resolver = module.require(classPath.join('/'));

                if (!resolver) throw Error(`Undefined resolver: ${resolverValue.class}`);

                // @ts-ignore
                this.resolvers[resolverValue.class] = new resolver;
            }

            return this.resolvers[resolverValue.class].resolver(source, args, context, info);
        }

        return defaultFieldResolver(source, args, context, info);
    }
}

