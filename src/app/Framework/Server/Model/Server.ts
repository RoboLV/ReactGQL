/**
 * @author Rihard <pub@email.soon>
 * @package regl
 */

import path from "path";
import DotEnv from 'dotenv';
import Express, { Express as ExpressInterface } from 'express';

import namespace from "@framework/Modules/Model/DI/Decorators/Namespace";
import Container from "@framework/Modules/Model/Container";
import Singleton from "@framework/Modules/Model/DI/Decorators/Singleton";

/**
 * Main server class
 */
@namespace('Framework.Server.Model')
@Singleton()
export default class Server extends Container {
    /**
     * Express instance
     */
    private _express: ExpressInterface;

    /**
     * Start server
     */
    public run(): void {
        this._createExpress();
        this._setupConfiguration();
        this.bindMiddleWares();
        this._setupPublicPath();
        this._startUpExpress();
    }

    /**
     * Start express server
     *
     * @private
     */
    protected _createExpress(): void {
        this._express = Express();
    }

    /**
     * Initialize express server configuration
     *
     * @private
     */
    protected _setupConfiguration(): void {
        DotEnv.config();
        this.express.set('port', process.env.PORT || 3000);
    }

    /**
     * Setup default public path
     *
     * @private
     */
    protected _setupPublicPath(): void {
        this.express.use(Express.static('public'));
        this.express.use('*', (req,res) =>{
            res.sendFile(path.join(__dirname, '../../dist/public/index.html'));
        });
    }

    /**
     * Register graphQL service
     *
     * @private
     */
    public bindMiddleWares(): void {}

    /**
     * Run express server
     *
     * @private
     */
    protected _startUpExpress(): void {
        this.express.listen(this.express.get('port'), () => {
            console.log(
                "App is running at http://localhost:%d in %s mode",
                this.express.get("port"),
                this.express.get("env")
            );
            console.log("  Press CTRL-C to stop\n");
        });
    }

    /**
     * Get express instance
     */
    get express(): ExpressInterface {
        return this._express;
    }
}
