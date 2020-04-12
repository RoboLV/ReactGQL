/*
 * @author Rihard <pub@email.soon>
 * @package regl
 */

import {BaseModuleConfigAbstract} from "@framework/Modules/Model/BaseModuleConfigAbstract";

/**
 * HelloWorld config
 */
export class Config extends BaseModuleConfigAbstract{
    name = 'HelloWorld';
    sequence: [];
}
export default new Config();
