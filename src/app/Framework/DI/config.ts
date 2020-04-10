/*
 * @author Rihard <pub@email.soon>
 * @package regl
 */

import {BaseModuleConfigInterface} from "@framework/Modules/Api/BaseModuleConfigInterface";

/**
 * HelloWorld config
 */
export class Config implements BaseModuleConfigInterface {
    name = 'DI';
    sequence: [];
}
export default new Config();
