import {Application} from "express";
import {Config} from "../../utils/config";

export default async function setupMiddlewares(app:Application, config:Config):Promise<Application>{

    return app;
}

