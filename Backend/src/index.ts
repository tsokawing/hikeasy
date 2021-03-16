import {connectTest} from './MysqlConnector'
import { HikEasyApp } from "./HikEasyApp";

// load dotenv as the first thing to do
require('dotenv').config();

const express = require('express');
const app = express();
const port = 8080;

// establish root endpoint
// this is a sample on how to further extend the backend code
app.get('/', async function(req: any, res: any) {
    res.send({
        'running': true,
        'message': 'Hello World!',
    });
});

// read two number and sum them
app.get('/demo_sum', async function(req: any, res: any){
    const firstNumber = req.params.num1;
    const secondNumber = req.params.num2;
    const sum = firstNumber + secondNumber;
    res.send({
        'result': sum
    });
});

// link the different modules to the main file
// we will leave this blank for now, this is currently empty project...
const appInstance = new HikEasyApp();

// finally specify that we are starting the backend
app.listen(port, () => {
    console.log(`Backend is now started at http://localhost:${port}`)
})
