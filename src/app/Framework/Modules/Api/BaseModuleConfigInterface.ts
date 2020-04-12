/**
 * Config interface
 */
import DIModuleConfigurationInterface from "@framework/Modules/Api/DIModuleConfigurationInterface";

export interface BaseModuleConfigInterface {
    /**
     * Module unique name
     */
    name: string;

    /**
     * Module parents
     */
    sequence: string[];

    /**
     * DI configuration
     */
    di: [DIModuleConfigurationInterface];
}
