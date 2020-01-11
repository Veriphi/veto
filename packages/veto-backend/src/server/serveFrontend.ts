import express, {Application} from "express";
import proxy from "express-http-proxy";
import {Config} from "../utils/config";

export default function serveFrontend(config: Config): (app: Application) => Promise<Application> {
    return async (app: Application): Promise<Application> => {
        // Need to happen last
        if (config.environment === 'dev') {
            app.use('/', proxy('localhost:3000'));
        } else {
            app.use('/', express.static('frontend'))
        }

        return app;
    }
}
