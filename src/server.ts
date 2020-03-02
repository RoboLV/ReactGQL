import 'module-alias/register';
// @ts-ignore
import expressCluster from "express-cluster";
import DotEnv from 'dotenv';
import { App } from '@framework';

DotEnv.config();

expressCluster(() => {
    const app = new App();
    app.run();
}, {
    count: process.env.CLUSTER_COUNT || 1
});
