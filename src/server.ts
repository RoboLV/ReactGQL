import 'module-alias/register';
// @ts-ignore
import expressCluster from "express-cluster";
import DotEnv from 'dotenv';
import { Server } from '@framework/Server/Model/Server';
import DIFactory from "@framework/DI/Model/Factory";

DotEnv.config();

expressCluster(() => {
    const app = DIFactory.create<Server>(Server);
    app.run();
}, {
    count: process.env.CLUSTER_COUNT || 1
});
