import express, {Request, Response} from "express";
import proxy from 'express-http-proxy';
import config from './config';

const app = express();

console.log('config = ', config);
if (config.environment === 'dev') {
    app.use('/', proxy('localhost:3000'));
} else {
    app.use('/', express.static('frontend'))
}

app.get('/api', (request: Request, response: Response) => {
    console.log('request.body', request.body);
    response.send('Hello World!')
});

app.listen(config.port, () => console.log(`Example app listening on port ${config.port}!`));

console.log('hello from typescript');
