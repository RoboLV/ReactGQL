import Express from 'express';
import GraphQL from 'Server/GraphQl';
import path from 'path';

/**
 * Server class
 */
export default class Server {
    /**
     * Server instance
     *
     * @type {null}
     */
    instance = null;

    /**
     * GraphQL instance
     *
     * @type {GraphQl}
     */
    graphQl = null;

    /**
     * Port
     *
     * @type {number}
     */
    port = 3000;

    /**
     * Server constructor
     */
    constructor() {
        this.instance = Express();
    }

    /**
     * Set configuration to server
     *
     * @param config
     */
    configuration(config = {}) {
        const { port } = config;

        this.port = port || this.port;
    }

    /**
     * Run server
     */
    run() {
        this.log('Starting');

        this.graphQl = new GraphQL(this.instance, 'App/Resolvers');
        this.graphQl.initialize();

        this.instance.use(Express.static('public'));
        this.instance.use('*', (req,res) =>{
            res.sendFile(path.join(__dirname, '../public/index.html'));
        });

        this.instance.listen(this.port);
        this.log('Started on ', this.port);
    }

    /**
     * Add log
     *
     * @param messages
     */
    log(...messages) {
        console.log('[SERVER]', ...messages);
    }
}
