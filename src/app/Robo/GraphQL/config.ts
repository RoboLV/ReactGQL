/*
 * @author Rihard <pub@email.soon>
 * @package regl
 */

import {BaseModuleConfigInterface} from "@app/Robo/Modules/Api/BaseModuleConfigInterface";

/**
 * HelloWorld config
 */
export class Config implements BaseModuleConfigInterface {
    name = 'GraphQL';
    sequence: [];
}
export default new Config();
