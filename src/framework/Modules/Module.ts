import {ModuleInterface} from "@framework/Modules/Api/ModuleInterface";
import {BaseModuleConfigInterface} from "@framework/Modules/Api/BaseModuleConfigInterface";

export class Module implements ModuleInterface {
    /**
     * Module name
     */
    name: string;

    /**
     * Config
     */
    config: BaseModuleConfigInterface;

    /**
     * Constructor
     *
     * @param name
     */
    constructor(name: string) {
        this.name = name;

        import(`@app/${name}/etc/config`).then((config) => {
            this.config = config;
        });
    }

    /**
     *
     * @param className
     */
    require(className: string): object {
        return undefined;
    }
}
