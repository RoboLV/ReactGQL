/*
 * @author Rihard <pub@email.soon>
 * @package regl
 */

import DIModuleConfigurationInterface from "@framework/Modules/Api/DIModuleConfigurationInterface";
import {BaseModuleConfigAbstract} from "@framework/Modules/Model/BaseModuleConfigAbstract";

/**
 * HelloWorld config
 */
export class Config extends BaseModuleConfigAbstract{
    name = 'Server';
}
export default new Config();
