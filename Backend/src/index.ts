/*
  What: This is the main file for the backend service, it stores all the app instances and the config
  Who: Wong Wing Yan 1155125194 Tsang Tsz Kin Brian 1155126813
  Where: backend server
  Why: In nodejs index.ts is the entry point when running server, we will set the services to provide endpoint
  How: use typeorm, REST API to create connection to database, and setup endpoint for clients
*/

// load dotenv as the first thing to do
import * as dotenv from 'dotenv';
dotenv.config();
//imports
import { Application, Request, Response } from 'express';
import { HikEasyApp } from './HikEasyApp';
import { TrailService } from './service/TrailService';
import { UserService } from './service/UserService';
import { EventService } from './service/EventService';
import { ReviewService } from './service/ReviewService';
import fileUpload from 'express-fileupload';
import cors from 'cors';
import passport from 'passport';
import FirebaseStrategy, { TokenLoader } from 'passport-jwt-firebase';
import { ImageService } from './service/ImageService';
import { ChatService } from './service/ChatService';
const express = require('express');
const app: Application = express();
const port = 8080;

// configure the express first so that we can unpack the body of incoming POST requests
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// configure the CORS
app.use(cors());

// and also enable file upload
app.use(
  fileUpload({
    createParentPath: true,
  })
);

// and also set up some basic firebase config;
// we delegate the actual authentication action to the individual endpoints, because some may need auth but some may not need
TokenLoader.Load();
passport.use(new FirebaseStrategy());
app.use(passport.initialize());

// establish root endpoint
// this is a sample on how to further extend the backend code
app.get('/', async function (req: Request, res: Response) {
  res.send({
    running: true,
    message: 'Hello World!',
  });
});

// link the different modules to the main file
// we will leave this blank for now, this is currently empty project...
export const appInstance = new HikEasyApp();
const trailService = new TrailService(app);
const userService = new UserService(app);
const eventService = new EventService(app);
const reviewService = new ReviewService(app);
const imageService = new ImageService(app);
const chatService = new ChatService(app);

// finally specify that we are starting the backend
app.listen(port, () => {
  console.log(`Backend is now started at http://localhost:${port}`);
});
