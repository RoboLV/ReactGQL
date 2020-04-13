/**
 * @author Rihard <pub@email.soon>
 * @package regl
 */

export const Singleton = (): ((target: any) => void) => {
    return (target: any) => {
        target.prototype.__is_singleton__ = true;
    };
};

export default Singleton;
