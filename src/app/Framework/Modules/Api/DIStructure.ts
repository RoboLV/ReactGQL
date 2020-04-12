/**
 * @author Rihard <pub@email.soon>
 * @package regl
 */

export default interface DIStructure {
    [namespace: string]: {
        plugins: {
            method: string,
            plugin: (target: any, callback: (...args: any[]) => any, ...args: any[]) => void,
            pluginModel: object,
            position: number
        }[]
    }
}
