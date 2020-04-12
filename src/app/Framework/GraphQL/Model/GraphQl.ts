/*
 * @author Rihard <pub@email.soon>
 * @package regl
 */

import graphqlHTTP from 'express-graphql';
import {
    buildSchema, GraphQLSchema, defaultFieldResolver, GraphQLResolveInfo, getDirectiveValues, extendSchema, parse
} from 'graphql';

import {BaseResolverInterface} from "@framework/GraphQL/API/Resolver/BaseResolverInterface";
import ModuleManager from "@framework/Modules/Model/Manager";
import Server from "@framework/Server/Model/Server";
import DIFactory from "@framework/Modules/Model/DI/Factory";
import namespace from "@framework/Modules/Model/DI/Decorators/Namespace";

/**
 * Express GraphQL Wrapper and interface
 */
@namespace('Framework.GraphQL.Model')
export class GraphQl {
    /**
     * App reference
     */
    private _app: Server;

    /**
     * Resolved resolvers
     */
    private resolvers: {[key: string]: BaseResolverInterface} = {};

    /**
     * Constructor
     *
     * @param app
     */
    constructor(app: Server) {
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
        const schema: string[] = [];
        ModuleManager.getModule('Framework.GraphQL')
            .requireResource('resources/baseSchema.graphqls', (content: string) => {
                schema.push(content);
            }, false);

        ModuleManager.getModuleNameList().forEach((moduleName: string) => {
            this._app.moduleManager
                .getModule(moduleName)
                .requireResource(
                    'resource/schema.graphqls',
                    (content: string) => schema.push(content),
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
                this.resolvers[resolverValue.class] = DIFactory.create<BaseResolverInterface>(resolver);
            }

            return this.resolvers[resolverValue.class].resolver(source, args, context, info);
        }

        return defaultFieldResolver(source, args, context, info);
    }
}

