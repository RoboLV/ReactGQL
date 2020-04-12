/**
 * @author Rihard <pub@email.soon>
 * @package regl
 */

import ModuleManager from "@framework/Modules/Model/Manager";
import DIModuleConfigurationInterface, {Type} from "@framework/Modules/Api/DIModuleConfigurationInterface";
import {ModuleInterface} from "@framework/Modules/Api/ModuleInterface";
import Factory from "@framework/Modules/Model/DI/Factory";
import DIStructure from "@framework/Modules/Api/DIStructure";

/**
 * Build DI structure
 */
export class Builder {
    /**
     * Config storage
     */
    diConfig: {[key: string]: { sequence: string[], di: DIModuleConfigurationInterface[]}} = {};

    /**
     * Structure which stores prepared DI structure
     */
    diStructure: DIStructure = {};

    /**
     * Build di tree
     */
    public build() {
        this._loadDIConfiguration();
        this._processDIConfig();
        this._postDIProcessor();

        return this.diStructure;
    }

    /**
     * Load and prepare all data
     *
     * @private
     */
    protected _loadDIConfiguration(): void {
        ModuleManager.getModuleNameList().forEach((moduleName: string) => {
            const module = ModuleManager.getModule(moduleName);
            const config = module.config;

            if (Object.values(config.di || []).length > 0) {
                this.diConfig[moduleName] = {
                    sequence: config.sequence,
                    di: config.di
                };
            }
        });
    }

    /**
     * Process DI configuration
     *
     * @private
     */
    protected _processDIConfig() {
        Object.entries(this.diConfig || {}).forEach(([moduleName, {di}]) => {
            const module = ModuleManager.getModule(moduleName);

            Object.values(di || []).forEach(rule => {
                if (rule.type === Type.Plugin) {
                    this._processPlugin(module, rule);
                }
            });
        });
    }

    /**
     * Process plugins
     *
     * @param module
     * @param rule
     * @private
     */
    protected _processPlugin(module: ModuleInterface, rule: DIModuleConfigurationInterface) {
        const pluginPath = rule.target.split('.').slice(2).join('.');
        const pluginModelClass = module.require(pluginPath);
        // @ts-ignore
        const pluginModel = Factory.create<any>(pluginModelClass);
        const methodPlugins = pluginModel.constructor.prototype.__plugins__;

        Object.entries(methodPlugins || {}).forEach(([sourceName, pluginName]) => {
            if (!this.diStructure[rule.source]) {
                // @ts-ignore
                this.diStructure[rule.source] = {};
            }

            if (!this.diStructure[rule.source].plugins) {
                this.diStructure[rule.source].plugins = [];
            }

            this.diStructure[rule.source].plugins.push({
                method: sourceName,
                plugin: pluginModel[pluginName].bind(pluginModel),
                pluginModel,
                position: rule.position
            });
        });
    }

    /**
     * Correct data in right order
     *
     * @private
     */
    protected _postDIProcessor() {
        // Access via reference
        for (let namespace in this.diStructure) {
            // postprocess plugins
            if (this.diStructure[namespace].plugins) {
                this.diStructure[namespace].plugins.sort((l, h) => (l.position - h.position));
            }
        }
    }
}
