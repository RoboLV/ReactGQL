/**
 * Container class which provide class storage functionality
 */
export class Container {
    /**
     * Data container
     */
    protected _data: any = {};

    /**
     * Get data
     *
     * @param key
     */
    public get(key:string): any {
        return this._data[key] || null;
    }

    /**
     * Set data
     *
     * @param key
     * @param value
     */
    public set(key:string, value:any): Container {
        this._data[key] = value;

        return this;
    }
}
