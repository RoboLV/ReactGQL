/**
 * @author Rihard <pub@email.soon>
 * @package regl
 */

import * as fs from "fs";
import {GraphQLResolver} from "@framework/Modules/Model/Resource/MergeResolver/GraphQLResolver";
import {ModuleInterface} from "@framework/Modules/Api/ModuleInterface";
import {BaseModuleConfigInterface} from "@framework/Modules/Api/BaseModuleConfigInterface";
import ModuleManager from "@framework/Modules/Model/Manager";

/**
 * Module
 */
export class Module implements ModuleInterface {
    /**
     * Module name
     */
    name: string;

    /**
     * Module vendor
     */
    vendor: string;

    /**
     * Config
     */
    config: BaseModuleConfigInterface;

    /**
     * Resolved class cache
     */
    _cacheClass: {[key:string]: object} = {};

    /**
     * Constructor
     *
     * @param vendor
     * @param name
     */
    constructor(vendor: string, name: string) {
        this.vendor = vendor;
        this.name = name;
        this.config = this.require(`/config`) as BaseModuleConfigInterface;
    }

    /**
     * Require module subclass
     *
     * @param className
     */
    require(className: string): object {
        const classPath = `${this.getScope()}/${className}`;

        if (!this._cacheClass[classPath]) {
            this._cacheClass[classPath] = require(classPath).default;
        }

        if (!this._cacheClass[classPath]) {
            throw Error(`Could not find class: ${classPath}`);
        }

        return this._cacheClass[classPath];
    }

    /**
     * Require resource
     *
     * @param resource
     * @param callback
     * @param merge
     */
    requireResource(resource: string, callback: (content: String) => {}, merge: boolean = true): void {
        const fileResources = [];

        Object.values(this.config.sequence || []).forEach((moduleName) => {
            ModuleManager
                .getModule(moduleName)
                .requireResource(resource, (data) => data && fileResources.push(data), false);
        });

        try {
            const data = fs.readFileSync(`${this.getLocation()}/${resource}`);
            if (data) fileResources.push(data.toString());

            if (!merge) {
                fileResources.forEach((res) => {
                    callback(res);
                })
            } else {
                callback(this._mergeResourceFile(resource, fileResources));
            }
        } catch (e) {} // ignore
    }

    /**
     * Merge resource to single file
     *
     * @param resource
     * @param content
     * @private
     */
    protected _mergeResourceFile(resource: string, content: string[]) {
        const resourceFileType = resource.split('.').pop();

        switch (resourceFileType) { // TODO: improve
            case 'graphql':
            case 'graphqls':
                const resolver = new GraphQLResolver(); // TODO automate

                return resolver.resolver(resource, content);
            default:
                return content.pop();
        }
    }

    /**
     * Get Scope
     */
    getScope(): string {
        return `@app/${this.vendor}/${this.name}`;
    }

    /**
     * Get module location
     */
    getLocation(): string {
        return `dist/app/${this.vendor}/${this.name}`;
    }

    /**
     * Get module full name
     */
    getModuleName(): string {
        return `${this.vendor}.${this.name}`;
    }
}
