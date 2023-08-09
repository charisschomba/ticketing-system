import express from "express";
import { json } from "body-parser";
import morgan from 'morgan';

import routes from "./routes"

const app = express();

app.use(json());
app.use(morgan(function (tokens, req, res) {
    return [
        tokens.method(req, res),
        tokens.url(req, res),
        tokens.status(req, res), '-',
        tokens['response-time'](req, res), 'ms'
    ].join(' ')}));

routes(app);
app.listen(3000, () => console.log("Listening on port 3000"))