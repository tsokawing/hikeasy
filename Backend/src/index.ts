// load dotenv as the first thing to do
import * as dotenv from 'dotenv';
dotenv.config();

import { Application, Request, Response } from 'express';
import { HikEasyApp } from './HikEasyApp';
import { TrailService } from './service/TrailService';
import { UserService } from './service/UserService';
import { EventService } from './service/EventService';
import { ReviewService } from './service/ReviewService';
import fileUpload, { UploadedFile } from 'express-fileupload';
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

// read two number and sum them
app.get('/demo_sum', async function (req: Request, res: Response) {
  const firstNumber = req.params.num1;
  const secondNumber = req.params.num2;
  const sum = firstNumber + secondNumber;
  res.send({
    result: sum,
  });
  if (req.files !== undefined) {
    const test = req.files['test'] ?? [];
    const test2 = test as UploadedFile;
    if (test2 !== null) {
    }
  }
});

// receive upload files
// is always POST
app.post('/demo_upload', async function (req: Request, res: Response) {
  try {
    console.log(
      '/demo_upload triggered; uploaded files are available under req.files:'
    );
    console.log(req.files);
    if (!req.files) {
      res.send({
        status: false,
        message: 'No file uploaded',
      });
    } else {
      // todo: standardize with an iterface so that we can change <object> to <ModelName>
      // refer to the UploadedFile type from express-fileupload
      const data: Array<object> = [];

      // determine if it is single file or multi file
      // also unify the data types
      const arrayOfPhotos = Array.isArray(req.files['photos'])
        ? req.files['photos']
        : [req.files['photos']];

      //loop all files
      arrayOfPhotos.forEach((photo) => {
        //move photo to uploads directory
        photo.mv('./uploads/' + photo.name);

        //push file details
        data.push({
          name: photo.name,
          mimetype: photo.mimetype,
          size: photo.size,
        });
      });

      //return response
      res.send({
        status: true,
        message: 'Files are uploaded',
        data: data,
      });
    }
  } catch (err) {
    res.status(500).send(err);
  }
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
