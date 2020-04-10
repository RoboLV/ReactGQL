/*
 * @author Rihard <pub@email.soon>
 * @package regl
 */

/**
 * Resolver interface
 */
export interface BaseResolverInterface {
    /**
     * Root value scope
     */
    getRootValuePath(): string

    /**
     * Resolve query
     *
     * @param obj
     * @param args
     * @param context
     * @param info
     */
    resolver(obj: object, args: object[], context: object, info: object): any
}
