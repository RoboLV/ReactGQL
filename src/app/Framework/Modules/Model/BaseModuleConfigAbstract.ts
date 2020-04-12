/**
 * @author Rihard <pub@email.soon>
 * @package regl
 */
import {BaseModuleConfigInterface} from "@framework/Modules/Api/BaseModuleConfigInterface";
import DIModuleConfigurationInterface from "@framework/Modules/Api/DIModuleConfigurationInterface";

/**
 * Abstract module configuration
 */
export abstract class BaseModuleConfigAbstract implements BaseModuleConfigInterface{
    name: string;
    sequence: string[];
    di: DIModuleConfigurationInterface[];
}
