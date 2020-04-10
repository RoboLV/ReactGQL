import ModulesConfig from '@app/index'
import {Container} from "@framework/Container";
import {ModuleInterface} from "@framework/Modules/Api/ModuleInterface";
import {Module} from "@framework/Modules/Module";
/**
 * Module manager
 */
export class Manager {
    /**
     * Self instance
     */
    static instance: Manager;

    /**
     * Modules storage
     */
    _modules: Container = new Container();

    /**
     * initialize and load modules
     */
    public initialize() {
        this.loadModules();
    }

    /**
     * Get module
     *
     * @param name
     * @return Maybe<ModuleInterface>
     */
    public getModule(name: string) {
        return this._modules.get(name);
    }

    /**
     * Get loaded modules names
     */
    public getModuleNameList(): string[] {
        return Object.keys(this._modules.data)
    }

    /**
     * Load modules
     */
    protected loadModules() {
        const modulesList = ModulesConfig.module;

        Object.values(modulesList).forEach((name) => {
            const module = new Module(
                name
            );
            this._modules.set(name, module);
        });
    }
}

Manager.instance = Manager.instance || new Manager();
export default Manager.instance
