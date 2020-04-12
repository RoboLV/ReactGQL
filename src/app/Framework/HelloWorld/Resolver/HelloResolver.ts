/**
 * @author Rihard <pub@email.soon>
 * @package regl
 */

import {BaseResolverAbstract} from "@framework/GraphQL/API/Resolver/BaseResolverAbstract";
import namespace from "@framework/Modules/Model/DI/Decorators/Namespace";

@namespace('Framework.HelloWorld.Resolver')
export default class HelloResolver extends BaseResolverAbstract {
    /**
     * Resolver
     *
     * @param obj
     * @param args
     * @param context
     * @param info
     */
    resolver(obj: object, args: object[], context: object, info: object): any {
        debugger;
        console.log(this);
        return {
            msg: "Hello!"
        };
    }
}
