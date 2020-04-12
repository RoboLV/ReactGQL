/**
 * @author Rihard <pub@email.soon>
 * @package regl
 */

import ModuleManager from "@framework/Modules/Model/Manager";

/**
 * Namespace decorator to set namespace to class
 *
 * @param url
 */
export const namespace = (url: String): ((target: any) => void) => {
    return (target: any) => {
        target.prototype.__module__ = url.split('.').slice(0, 2).join('.'); // First 2
        target.prototype.__namespace__ = url; // Namespace to class
        target.prototype.__class_name__ = `${url}.${target.name}`; // full class namespace path

        ModuleManager.injectDI(target);
    }
};

// @ts-ignore
export default namespace;
