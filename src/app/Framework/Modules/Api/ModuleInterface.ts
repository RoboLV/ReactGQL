/**
 * @author Rihard <pub@email.soon>
 * @package regl
 */

import {BaseModuleConfigInterface} from "@framework/Modules/Api/BaseModuleConfigInterface";

/**
 * Base module interface
 */
export interface ModuleInterface {
    /**
     * Module name
     */
    name: string;

    /**
     * Module vendor
     */
    vendor: string;

    /**
     * ModuleConfig
     */
    config: BaseModuleConfigInterface;

    /**
     * Require module subclass
     *
     * @param className
     */
    require(className: string): object;

    /**
     * Require resource
     *
     * @param resource
     * @param callback
     * @param merge
     */
    requireResource(resource: string, callback: (content: String) => any, merge: boolean): void;

    /**
     * Get module scope
     */
    getScope(): string;

    /**
     * Get module location
     */
    getLocation(): string;

    /**
     * Get name with vendor
     */
    getModuleName(): string;
}
