/**
 * @author Rihard <pub@email.soon>
 * @package regl
 */

import namespace from "@framework/Modules/Model/DI/Decorators/Namespace";
import pluginMethod from "@framework/Modules/Model/DI/Decorators/PluginMethod";

@namespace('Framework.HelloWorld.Plugin.Model')
export default class ServerPlugin {
    /**
     * Plugin
     *
     * @param target
     * @param callback
     * @param args
     * @private
     */
    @pluginMethod("_setupGraphQl")
    _setupGraphQl(target: any, callback: (...arg0: any) => any, ...args: any[]): any {
        console.log('1234');

        return callback(...args);
    }
}
