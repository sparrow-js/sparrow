import express from "express";
import sockjs from "sockjs";
import http from "http";
import compression from "compression";
import bodyParser from "body-parser";
import path from "path";
import got from 'got';
import { readFileSync } from 'fs';
import { join, resolve, dirname } from 'path';

import * as userController from "./controllers/user";
import RunViewTask from './connectors/RunViewTask'


const LOCAL_DEBUG = process.env.LOCAL_DEBUG;

const app = express();


app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

/**
 * Primary app routes.
 */
// app.get("/", userController.index);
app.get("/login", userController.getLogin);

function replaceScripts(body: string): string {
  return body.replace(/(\/js.+?.js)/g, '//localhost:8080$1');
}

if (!LOCAL_DEBUG) {
  app.use(
    express.static(join(__dirname, '../client/dist'), {
      index: false,
    }),
  );
}


app.use('/*', async (req, res) => {
  if (LOCAL_DEBUG) {
    const { body } = await got(`http://localhost:8080${req.path}`);
    res.set('Content-Type', 'text/html');
    res.send(replaceScripts(body));
  } else {
    const content = readFileSync(join(__dirname, '../client/dist/index.html'), 'utf-8');
    res.send(content);
  }
});



const ss = sockjs.createServer();


ss.on('connection', conn => {
  conn.on('close', () => {});
  conn.on('data', message => {
    conn.write(message)
  });
});
const port = 3000;
const server = app.listen(port, process.env.HOST || '127.0.0.1', err => {
    // just TEST or ALL ?
});
ss.installHandlers(server, {
  prefix: '/sprui',
  log: () => {},
});



export default app;
