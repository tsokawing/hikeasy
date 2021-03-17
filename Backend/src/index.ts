import { Application, Request, Response } from 'express';
import { HikEasyApp } from './HikEasyApp';
import { TrailService } from './service/TrailService';

// load dotenv as the first thing to do
import * as dotenv from 'dotenv';
dotenv.config();

const express = require('express');
const app: Application = express();
const port = 8080;

// configure the express first so that we can unpack the body of incoming POST requests
app.use(express.urlencoded({ extended: true }));

// establish root endpoint
// this is a sample on how to further extend the backend code
app.get('/', async function (req: Request, res: Response) {
  res.send({
    running: true,
    message: 'Hello World!',
  });
});

// read two number and sum them
app.get('/demo_sum', async function (req: Request, res: Response) {
  const firstNumber = req.params.num1;
  const secondNumber = req.params.num2;
  const sum = firstNumber + secondNumber;
  res.send({
    result: sum,
  });
});

// link the different modules to the main file
// we will leave this blank for now, this is currently empty project...
export const appInstance = new HikEasyApp();
const trailService = new TrailService(app);

// finally specify that we are starting the backend
app.listen(port, () => {
  console.log(`Backend is now started at http://localhost:${port}`);
});
