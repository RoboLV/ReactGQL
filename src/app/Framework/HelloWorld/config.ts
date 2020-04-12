/*
 * @author Rihard <pub@email.soon>
 * @package regl
 */

import {BaseModuleConfigAbstract} from "@framework/Modules/Model/BaseModuleConfigAbstract";
import DIModuleConfigurationInterface, {Type} from "@framework/Modules/Api/DIModuleConfigurationInterface";

/**
 * HelloWorld config
 */
export class Config extends BaseModuleConfigAbstract{
    name = 'HelloWorld';
    sequence: [
        'Framework.Server'
    ];
    di: [DIModuleConfigurationInterface] = [
        {
            position: 1000,
            source: 'Framework.Server.Model.Server',
            target: 'Framework.HelloWorld.Plugin.Model.ServerPlugin',
            type: Type.Plugin
        }
    ];
}
export default new Config();
