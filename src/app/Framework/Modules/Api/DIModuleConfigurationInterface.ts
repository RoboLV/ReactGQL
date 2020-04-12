/**
 * @author Rihard <pub@email.soon>
 * @package regl
 */

export enum Type {
    Plugin = 1,
    Extend
}

/**
 * DI configuration to rewrite files
 */
export default interface DIModuleConfigurationInterface {
    /**
     * When rule should be applied
     */
    position: number;

    /**
     * Type of rule
     */
    type: Type;

    /**
     * Class file which should affect on source plugin
     */
    target: string;

    /**
     * File on which rule should be applied
     */
    source: string;
}
