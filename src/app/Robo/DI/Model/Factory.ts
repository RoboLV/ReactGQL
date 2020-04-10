/*
 * @author Rihard <pub@email.soon>
 * @package regl
 */

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
export class Factory {
    /**
     * instance container
     */
    static instance: Factory = null;

    /**
     * Resolved class cache storage
     */
    protected _classCache: {[key: string]: object} = {};

    /**
     * DI Factory constructor
     */
    constructor() {
        Factory.instance = this;
    }

    /**
     * Create method
     */
    create<T>(target: Type<any>, ...args: any): T {
        const tokens = Reflect.getMetadata('design:paramtypes', target) || [];
        const injections = tokens.map((token: any) => Factory.instance.create<any>(token));

        return new target(...tokens);
    }
}

/**
 * Add to Objects unique id parameter, for factory cache
 */
if (typeof Object.__objectUID == "undefined" ) {
    let objectIDReference: number = 0;

    Object.__objectUID = function(o) {
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
