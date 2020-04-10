import {BaseResolverAbstract} from "@framework/Server/Resolver/BaseResolverAbstract";

export class HelloResolver extends BaseResolverAbstract {
    /**
     * Resolver
     *
     * @param obj
     * @param args
     * @param context
     * @param info
     */
    resolver(obj: object, args: object[], context: object, info: object): any {
        return 'hello!';
    }
}
