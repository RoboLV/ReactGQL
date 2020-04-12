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
    name = 'GraphQL';
    sequence: [
        'Framework.Server'
    ];
    di: DIModuleConfigurationInterface[] = [
        {
            source: 'Framework.Server.Model.Server',
            target: 'Framework.GraphQL.Plugin.Server',
            position: 100,
            type: Type.Plugin
        }
    ];
}
export default new Config();
