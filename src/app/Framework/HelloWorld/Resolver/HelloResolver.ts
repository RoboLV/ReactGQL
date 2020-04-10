import {BaseResolverAbstract} from "@framework/GraphQL/API/Resolver/BaseResolverAbstract";

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
        return {
            msg: "Hello!"
        };
    }
}
