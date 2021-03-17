import { Application, Request, Response } from 'express';
import { User } from '../entity/User';
import { HikEasyApp } from '../HikEasyApp';
import { EntityManager } from 'typeorm';

export class UserService {
  public constructor(app: Application) {
    app.get('/users/get_all', this.getAllUsers);
    app.post('/users/add_user', this.addNewUsers);
    app.get('/users/update_user/:UserID', this.updateUsers);
  }

  private async getAllUsers(req: Request, res: Response) {
    const users = await HikEasyApp.Instance.EntityManager?.find(User);
    //console.log(users);
    if (users == undefined) {
      // failed to connect to database
      res.status(503).json({
        message: 'Database unreachable',
      });
    } else {
      // ok
      res.status(200).json(users);
    }
  }
  private async addNewUsers(req: Request, res: Response){
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
          message: 'Missing user age',
        });
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
        res.json({
          success: false,
          message: 'Database unreachable',
        });
        return;
      }
      //check whether the email have been registered 
      const temp = await HikEasyApp.Instance.EntityManager?.find(User);
      //test duplicate email? 
    //   temp.forEach(function(temp){
    //     if(users.email == temp.email){
    //         res.json({
    //             //success: false,
    //             message: 'Duplicate Email',

    //         });
    //     }
    //   });
      HikEasyApp.Instance.EntityManager.save(users);
      res.json({
        success: true,
        message: 'Done',
      });
      
  }
  //method for updating user info through id
  private async updateUsers(req: Request, res: Response){
    console.log(req.param("UserID"));
    const id = req.params.UserID.split(":");
    console.log(id[1]);
    const users = await HikEasyApp.Instance.EntityManager?.findOne(User, id[1]);
    console.log(users);
    if(users != undefined){
        // users.email = req.body['userEmail'];
        // users.password = req.body['usePassword'];
        users.email = "gg@gmail.com";
        users.password = "dsdfsf ";
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
