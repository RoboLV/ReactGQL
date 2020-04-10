/**
 * @author Rihard <pub@email.soon>
 * @package regl
 */
import {readdirSync} from 'fs';

import {Container} from "@app/Robo/Server/Model/Container";
import {ModuleInterface} from "@app/Robo/Modules/Api/ModuleInterface";
import {Module} from "@app/Robo/Modules/Model/Module";
import Maybe from "graphql/tsutils/Maybe";

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
    _modules: Container = new Container();

    /**
     * Constructor
     */
    constructor() {
        Manager.instance = this;
    }

    /**
     * initialize and load modules
     */
    public initialize() {
        this._loadModules();
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
}

export default Manager.instance || new Manager();
