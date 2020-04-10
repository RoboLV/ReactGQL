import {BaseModuleConfigInterface} from "@framework/Modules/Api/BaseModuleConfigInterface";

export interface ModuleInterface {
    /**
     * Module name
     */
    name: string;

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
}
