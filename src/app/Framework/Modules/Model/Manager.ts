/**
 * @author Rihard <pub@email.soon>
 * @package regl
 */
import {readdirSync} from 'fs';

import {ModuleInterface} from "@framework/Modules/Api/ModuleInterface";
import {Module} from "@framework/Modules/Model/Module";
import Maybe from "graphql/tsutils/Maybe";
import {Builder} from "@framework/Modules/Model/DI/Builder";
import Container from "@framework/Modules/Model/Container";
import DIStructure from "@framework/Modules/Api/DIStructure";

/**
 * Module manager
 */
export class Manager {
    /**
     * Self instance
     */
    static instance: Manager;

    /**
     * Modules storage
     */
    _modules: Container;

    /**
     * DI tree
     */
    _diTree: DIStructure = {};

    /**
     * Constructor
     */
    constructor() {
        Manager.instance = this;
        this._modules = new Container();
    }

    /**
     * initialize and load modules
     */
    public initialize() {
        this._loadModules();
        this._buildDITree();
    }

    /**
     * Get module
     *
     * @param name
     * @return Maybe<ModuleInterface>
     */
    public getModule(name: string): Maybe<ModuleInterface> {
        return this._modules.get(name);
    }

    /**
     * Get loaded modules names
     */
    public getModuleNameList(): string[] {
        return Object.keys(this._modules.data)
    }

    /**
     * Load modules
     */
    protected _loadModules() {
        const vendors = readdirSync('dist/app', { withFileTypes: true })
            .filter(entity => entity.isDirectory())
            .map(entity => entity.name);

        vendors.forEach((vendor) => {
            const modules = readdirSync(`dist/app/${vendor}`, { withFileTypes: true })
                .filter(entity => entity.isDirectory())
                .map(entity => entity.name);

            modules.forEach((moduleName) => {
                const module = new Module(vendor, moduleName);
                this._modules.set(module.getModuleName(), module);
            });
        });

        this._prepareModuleParents();
    }

    /**
     * Assign parents for module
     * @private
     */
    protected _prepareModuleParents() {
    }

    /**
     * Create structure
     *
     * @private
     */
    protected _buildDITree(): void {
        const diBuilder = new Builder();
        this._diTree = diBuilder.build();
    }

    /**
     * inject
     * @param target
     */
    public injectDI(target: any) {
        const namespace = target.prototype.__class_name__;

        if (this._diTree[namespace]) {
            this._injectPlugins(target, namespace);
        }
    }

    /**
     * Add plugins
     *
     * @param target
     * @param namespace
     * @private
     */
    protected _injectPlugins(target: any, namespace: string) {
        const plugins = this._diTree[namespace].plugins || [];

        plugins.forEach((plugin) => {
            const sourceMethod = target.prototype[plugin.method];

            const wrapperMethod = function(...args: any[]) {
                plugin.plugin(this, sourceMethod.bind(this), ...args);
            };

            target.prototype[plugin.method] = wrapperMethod;
        });
    }
}

export default Manager.instance || new Manager();
