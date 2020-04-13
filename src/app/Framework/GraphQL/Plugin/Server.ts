/**
 * @author Rihard <pub@email.soon>
 * @package regl
 */
import namespace from "@framework/Modules/Model/DI/Decorators/Namespace";
import pluginMethod from "@framework/Modules/Model/DI/Decorators/PluginMethod";
import Factory from "@framework/Modules/Model/DI/Factory";
import {GraphQl} from "@framework/GraphQL/Model/GraphQl";

/**
 * GraphQL server plugin
 */
@namespace('Framework.GraphQL.Plugin')
export default class Server {
    /**
     * Bind GQL service
     * @param target
     * @param callback
     */
    @pluginMethod('bindMiddleWares')
    bindMiddleWares(target: any, callback: () => void) {
        const graphQL = Factory.create<GraphQl>(GraphQl);
        graphQL.initialize();
    }
}
