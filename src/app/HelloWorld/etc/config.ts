import {BaseModuleConfigInterface} from "@framework/Modules/Api/BaseModuleConfigInterface";

/**
 * HelloWorld config
 */
export class Config implements BaseModuleConfigInterface {
    name = 'HelloWorld';
    sequence: [];
}
export default new Config();
