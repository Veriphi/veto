import serveFrontend from "./serveFrontend";
import setupMiddlewares from "./middlewares";
import {Application, Request, Response} from "express";
import {Config} from "../utils/config";


export default async function serverSetup(app: Application, config: Config): Promise<void> {
    setupMiddlewares(app, config)
        .then((app: Application) => {
            app.get('/api', (request: Request, response: Response) => {
                response.send({message: 'Hello World from Veto API! ' + Math.random()})
            });

            return app;
        })
        // Note: serveFrontend need to be last to not override /api
        .then(serveFrontend(config))
        .then((app: Application) => {
            app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`));
        });
}
