import 'module-alias/register';
// @ts-ignore
import expressCluster from "express-cluster";
import DotEnv from 'dotenv';
import { Server } from '@app/Robo/Server/Model/Server';

DotEnv.config();

expressCluster(() => {
    const app = new Server();
    app.run();
}, {
    count: process.env.CLUSTER_COUNT || 1
});
