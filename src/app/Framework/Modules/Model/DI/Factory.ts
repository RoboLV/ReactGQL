/*
 * @author Rihard <pub@email.soon>
 * @package node_station
 */

import "reflect-metadata";

/**
 * Interface for create parameter
 */
export interface Type<T> {
    new(...args: any[]): T;
}

/**
 * DI Factory to initialize any class
 */
class Factory {
    /**
     * instance container
     */
    static instance: Factory = null;

    /**
     * Resolved class cache storage
     */
    protected _singletonStorage: {[key: string]: any} = {};

    /**
     * DI Factory constructor
     */
    constructor() {
        Factory.instance = this;
    }

    /**
     * Create method
     */
    create<T>(target: any, ...args: any): T {
        if (this._singletonStorage[target.prototype.__class_name__]) {
            return this._singletonStorage[target.prototype.__class_name__];
        }

        const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        const injections = tokens.map((token: any) => Factory.instance.create<any>(token));

        const instance = new target(...injections, ...args);

        // Save singleton
        if (target.prototype.__is_singleton__) {
            this._singletonStorage[target.prototype.__class_name__] = instance;
        }

        return instance;
    }

    /**
     * Clean Factory cache
     *
     * @private
     */
    _cleanCache() {
        this._singletonStorage = {};
    }
}

/**
 * Add to Objects unique id parameter, for factory cache
 */

// @ts-ignore
if (typeof Object.objectUID == "undefined" ) {
    let objectIDReference: number = 0;

    // @ts-ignore
    Object.objectUID = function(o) {
        if ( typeof o.__uniqueid == "undefined" ) {
            Object.defineProperty(o, "__uniqueid", {
                value: ++objectIDReference,
                enumerable: false,
                writable: false
            });
        }
    }
}

// Initialize singleton
export default Factory.instance || new Factory();
