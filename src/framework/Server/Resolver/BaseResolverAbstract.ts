import {BaseResolverInterface} from "@framework/Server/Resolver/BaseResolverInterface";

export abstract class BaseResolverAbstract implements BaseResolverInterface {
    /**
     * Get path
     */
    getRootValuePath(): string {
        return '';
    }

    /**
     * Default resolver
     *
     * @param obj
     * @param args
     * @param context
     * @param info
     */
    resolver(obj: object, args: object[], context: object, info: object): any {
        return null;
    }
}

