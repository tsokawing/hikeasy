import { Application, Request, Response } from 'express';
import { User } from '../entity/User';
import { HikEasyApp } from '../HikEasyApp';
import { ResponseUtil } from '../util/ResponseUtil';
import { FirebaseAuthenticator } from '../FirebaseAuthenticator';

export class UserService {
  public constructor(app: Application) {
    app.get('/users/get_all', this.getAllUsers);
    app.post('/users/add_user', this.addNewUsers);
    app.post(
      '/users/login_or_register/',
      FirebaseAuthenticator.authenticate,
      this.loginOrRegisterUser
    );
    app.post('/users/update_user/:userID', this.updateUsers);
  }

  private async getAllUsers(req: Request, res: Response) {
    const users = await HikEasyApp.Instance.EntityManager?.find(User);
    //console.log(users);
    if (users == undefined) {
      // failed to connect to database
      ResponseUtil.respondWithDatabaseUnreachable(res);
    } else {
      // ok
      res.status(200).json(users);
    }
  }

  private async loginOrRegisterUser(req: Request, res: Response) {
    // need to check whether we are existing user login or new user register
    const requestedUser = await FirebaseAuthenticator.extractProperUserFromAuth(
      req
    );
    if (requestedUser !== undefined) {
      // existing user, also passed firebase
      res.json({
        success: true,
        message: 'OK, welcome!',
      });
      return;
    } else {
      // new user, already passed firebase
      await this.addNewUsers(req, res);
    }
  }

  private async addNewUsers(req: Request, res: Response) {
    const users = new User();
    users.firstName = req.body['userFirstname'];
    users.lastName = req.body['userLastname'];
    users.age = req.body['userAge'];
    users.email = req.body['userEmail'];
    users.password = req.body['userPassword'];
    if (users.firstName === undefined || users.lastName == undefined) {
      res.json({
        success: false,
        message: 'Missing User Name',
      });
      return;
    }
    if (users.age === undefined) {
      users.age = 0;
      res.json({
        success: false,
        message: 'Missing user age',
      });
      return;
    }
    if (users.email === undefined) {
      res.json({
        success: false,
        message: 'Missing email address',
      });
      return;
    }
    if (users.password === undefined) {
      res.json({
        success: false,
        message: 'Missing password',
      });
      return;
    }
    if (HikEasyApp.Instance.EntityManager == undefined) {
      ResponseUtil.respondWithDatabaseUnreachable(res);
      return;
    }
    //check whether the email have been registered
    const temp = await HikEasyApp.Instance.EntityManager?.find(User);
    HikEasyApp.Instance.EntityManager.save(users);
    res.json({
      success: true,
      message: 'Done',
    });
  }
  //method for updating user info through id
  private async updateUsers(req: Request, res: Response){
    const id = parseInt(req.params['userID']);
    //console.log(id);
    const users = await HikEasyApp.Instance.EntityManager?.findOne(User, id);
    console.log(users);
    if(users != undefined){
        users.email = "gg@gmail.com";
        users.password = "test";
    }
    if(HikEasyApp.Instance.EntityManager != undefined){
        HikEasyApp.Instance.EntityManager.save(users);
    }
    res.json({
      success: true,
      message: 'Done',
    });
  }
}
