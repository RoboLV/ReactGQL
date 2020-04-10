import Express, { Express as ExpressInterface } from 'express';
import DotEnv from 'dotenv';
import path from "path";
import { Container } from "@framework/Container";
import { GraphQl } from "@framework/Server";
import ModuleManager, {Manager} from "@framework/Modules/Manager";

/**
 * Main server class
 */
export class App extends Container {
    /**
     * Express instance
     */
    private _express: ExpressInterface;

    /**
     * GraphQL wrapper instance
     */
    private _graphQl: GraphQl;

    /**
     * Module manager
     */
    private _moduleManager: Manager = ModuleManager;

    /**
     * Start server
     */
    public run(): void {
        this._createExpress();
        this._setupConfiguration();
        this._setupModuleManager();
        this._setupGraphQl();
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
    protected _setupGraphQl(): void {
        this._graphQl = new GraphQl(this);
        this._graphQl.initialize();
    }

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
     * Setup module manager
     * @private
     */
    protected _setupModuleManager() {
        this.moduleManager.initialize();
    }

    /**
     * Get module Manager
     */
    get moduleManager(): Manager {
        return this._moduleManager;
    }

    /**
     * Get express instance
     */
    get express(): ExpressInterface {
        return this._express;
    }
}
