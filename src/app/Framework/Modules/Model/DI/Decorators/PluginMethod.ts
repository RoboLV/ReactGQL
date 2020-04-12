/**
 * @author Rihard <pub@email.soon>
 * @package regl
 */

/**
 * Define plugin method
 *
 * @param originalMethodName
 */
export const pluginMethod = (originalMethodName: string): ((target: any, propertyKey: string) => void) => {
    return (target: any, propertyKey: string) => {
        if (!target.__plugins__) {
            target.__plugins__ = {};
        }

        target.__plugins__[propertyKey] = originalMethodName;
    }
};

export default pluginMethod;
