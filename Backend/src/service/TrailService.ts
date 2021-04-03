import { Application, Request, Response } from 'express';
import { Trail } from '../entity/Trail';
import { User } from '../entity/User';
import { HikEasyApp } from '../HikEasyApp';
import { ResponseUtil } from '../util/ResponseUtil';

export class TrailService {
  public constructor(app: Application) {
    app.get('/trails/get_all', this.getAllTrails);
    app.get('/trails/get_specific', this.getSpecificTrail_NoTrailID);
    app.get('/trails/get_specific/:trailID', this.getSpecificTrail);
    app.post('/trails/add_trail', this.addTrail);
    app.post('/trails/update_trail', this.updateTrail_NoTrailID);
    app.post('/trails/update_trail/:trailID', this.updateTrail);
    app.post('/trails/delete_trail', this.deleteTrail_NoTrailID);
    app.post('/trails/delete_trail/:trailID', this.deleteTrail);

    app.post('/trails/upload_photo', this.uploadPhotosForTrail);
    app.get('/trails/get_photo/:fileName', this.returnPhotoWithFileName);
    app.get('/trails/get_photo', this.returnPhotoButThereIsNoGivenFileName);
    app.post('/trails/delete_photo');

    app.get('/trails/fake_add', this.testFakeAddTrail);
    app.get('/trails/search_test', this.searchSomeTrailTest);
    app.post('/trails/post_test', this.postTest);
    // this.testtest();
  }

  private async getAllTrails(req: Request, res: Response) {
    const trails = await HikEasyApp.Instance.EntityManager?.find(Trail);
    if (trails == undefined) {
      // failed to connect to database
      ResponseUtil.respondWithDatabaseUnreachable(res);
    } else {
      // ok
      res.status(200).json(trails);
    }
  }

  private async getSpecificTrail_NoTrailID(req: Request, res: Response) {
    ResponseUtil.respondWithMissingTrailID(res);
  }

  private async getSpecificTrail(req: Request, res: Response) {
    const targetTrailID = parseInt(req.params['trailID']);
    if (Number.isNaN(targetTrailID)) {
      ResponseUtil.respondWithInvalidTrailID(res);
      return;
    }
    const trail = await HikEasyApp.Instance.EntityManager?.findOne(
      Trail,
      targetTrailID
    );
    res.json({
      success: true,
      response: trail,
    });
    return;
  }

  private async addTrail(req: Request, res: Response) {
    // check that all required details are here.
    const trail = new Trail();
    trail.name = req.body['trailName'];
    trail.difficulty = req.body['trailDifficulty'];
    trail.description = req.body['trailDescription'] ?? '';
    if (trail.name === undefined) {
      res.json({
        success: false,
        message: 'Missing trail name',
      });
      return;
    }
    if (trail.name.length == 0) {
      res.json({
        success: false,
        message: 'Trail name cannot be empty',
      });
      return;
    }
    if (trail.difficulty === undefined) {
      res.json({
        success: false,
        message: 'Missing trail difficulty',
      });
      return;
    }
    if (trail.difficulty < 0 || trail.difficulty > 5) {
      ResponseUtil.respondWithInvalidDifficulty(res);
      return;
    }
    // no problem, can insert!
    if (HikEasyApp.Instance.EntityManager == undefined) {
      ResponseUtil.respondWithDatabaseUnreachable(res);
      return;
    }
    HikEasyApp.Instance.EntityManager.save(trail);
    // successfully inserted
    // todo what if we failed to insert at db level
    res.json({
      success: true,
      message: 'OK',
    });
  }

  private async updateTrail_NoTrailID(req: Request, res: Response) {
    ResponseUtil.respondWithMissingTrailID(res);
    return;
  }

  private async updateTrail(req: Request, res: Response) {
    const trailID = parseInt(req.params['trailID']);
    if (Number.isNaN(trailID)) {
      ResponseUtil.respondWithInvalidTrailID(res);
      return;
    }
    // need to check whether something has changed, respond false if nothing was changed
    if (HikEasyApp.Instance.EntityManager == undefined) {
      ResponseUtil.respondWithDatabaseUnreachable(res);
      return;
    }
    const targetedTrail = await HikEasyApp.Instance.EntityManager.findOne(
      Trail,
      trailID
    );
    if (targetedTrail == undefined) {
      res.json({
        success: false,
        message: 'No such trail',
      });
      return;
    }
    let somethingWasChanged = false;
    const updatedTrailName = req.body['trailName'];
    if (updatedTrailName !== undefined) {
      if (updatedTrailName.length == 0) {
        // cannot be empty
        res.json({
          success: false,
          message: 'Trail name cannot be empty',
        });
        return;
      }
      // name is non-empty
      targetedTrail.name = updatedTrailName;
      somethingWasChanged = true;
    }
    const updatedDifficulty = parseInt(req.body['trailDifficulty']);
    if (!Number.isNaN(updatedDifficulty)) {
      if (updatedDifficulty < 0 || updatedDifficulty > 5) {
        ResponseUtil.respondWithInvalidDifficulty(res);
        return;
      }
      // difficulty is OK
      targetedTrail.difficulty = updatedDifficulty;
      somethingWasChanged = true;
    }
    const updatedDescription = req.body['trailDescription'];
    if (updatedDescription !== undefined) {
      // we allow empty description -> no description
      targetedTrail.description = updatedDescription;
    }
    const updatedVerifiedStatus = Number.parseInt(req.body['isVerified']);
    if (updatedVerifiedStatus !== undefined) {
      // todo also check for admin status
      targetedTrail.isVerified = updatedVerifiedStatus ? true : false;
    }
    const updatedDidsplayStatus = Number.parseInt(req.body['isShown']);
    if (updatedDidsplayStatus !== undefined) {
      // todo also check for admin status
      targetedTrail.isShown = updatedDidsplayStatus ? true : false;
    }
    // other checks, yadda yadda
    if (!somethingWasChanged) {
      res.json({
        success: false,
        message: 'Nothing to update',
      });
      return;
    }
    // the object has been changed
    HikEasyApp.Instance.EntityManager.save(targetedTrail);
    // todo check whether it was successful
    res.json({
      success: true,
      message: 'OK',
    });
    return;
  }

  private async deleteTrail_NoTrailID(req: Request, res: Response) {
    ResponseUtil.respondWithMissingTrailID(res);
  }

  private async deleteTrail(req: Request, res: Response) {
    const targetTrailID = parseInt(req.params['trailID']);
    if (Number.isNaN(targetTrailID)) {
      ResponseUtil.respondWithInvalidTrailID(res);
      return;
    }
    await HikEasyApp.Instance.EntityManager?.softDelete(Trail, targetTrailID);
    res.json({
      success: true,
      message: 'OK',
    });
    return;
  }

  private async uploadPhotosForTrail(req: Request, res: Response) {
    // check userID exists!
    const userID = req.body['userID'];
    if (userID === undefined) {
      ResponseUtil.respondWithMissingUserID(res);
      return;
    }
    if (HikEasyApp.Instance.EntityManager == undefined) {
      ResponseUtil.respondWithDatabaseUnreachable(res);
      return;
    }
    // load user object/check user exists
    const uploaderUser = await HikEasyApp.Instance.EntityManager.findOne(
      User,
      userID
    );
    if (uploaderUser === undefined) {
      ResponseUtil.respondWithInvalidUserID(res);
      return;
    }
    try {
      if (!req.files) {
        // no files are uploaded
        ResponseUtil.respondWithError(res, 'No files were uploaded');
        return;
      } else {
        // todo: standardize with an iterface so that we can change <object> to <ModelName>
        // refer to the UploadedFile type from express-fileupload
        const uploadStatus: Array<object> = [];

        // determine if it is single file or multi file
        // also unify the data types
        const arrayOfPhotos = Array.isArray(req.files['photos'])
          ? req.files['photos']
          : [req.files['photos']];
        const nowTime = new Date();

        arrayOfPhotos.forEach((photo, photoIndex) => {
          // ensure everything is a photo
          if (
            !photo.mimetype.startsWith('image/') ||
            (!photo.name.endsWith('.jpg') &&
              !photo.name.endsWith('.jpeg') &&
              !photo.name.endsWith('.png'))
          ) {
            // not a photo! or, not accepted photo type! rejected
            uploadStatus.push({
              name: photo.name,
              mimetype: photo.mimetype,
              size: photo.size,
              accepted: false,
            });
          } else {
            // is a photo, can accept
            // rename to avoid name clash
            // make a name from userID, time, n-th photo
            // tips: time can (so far) be uniquely represented using sth known as the Unix Timestamp
            // Unix Timestamp will one day expire (around 2038) but well we already graduated by then
            // but we also need to check what is the file extension!
            const fileNameSplit = photo.name.split('.');
            const fileExtensionNoDot = fileNameSplit[fileNameSplit.length - 1];
            const newName =
              uploaderUser.id.toString() +
              '-' +
              nowTime.getTime().toString() +
              '-' +
              photoIndex.toString() +
              '.' +
              fileExtensionNoDot;
            // we save as a new name, keep the original name so that frontend approx knows what happened
            // and then move it to storage
            photo.mv('./uploads/' + newName);
            uploadStatus.push({
              name: photo.name,
              newName: newName,
              mimetype: photo.mimetype,
              size: photo.size,
              accepted: true,
            });
          }
        });

        //return response
        res.send({
          success: true,
          message: 'OK; please see details',
          response: uploadStatus,
        });
      }
    } catch (err) {
      // sth bad happened! probably related to file saving etc
      res.status(500).json({
        success: false,
        message: err,
      });
    }
  }

  private async returnPhotoWithFileName(req: Request, res: Response) {
    const fileName = req.params['fileName'];
    // assume must exist
    res.download('uploads/' + fileName, function () {
      // whatever reason, we cannot load/find the file
      res.sendStatus(404);
    });
  }

  private async returnPhotoButThereIsNoGivenFileName(
    req: Request,
    res: Response
  ) {
    ResponseUtil.respondWithError(res, 'Missing file name');
  }

  private async searchSomeTrailTest(req: Request, res: Response) {
    console.log(req.query['a']);
    res.json({});
  }

  private async postTest(req: Request, res: Response) {
    console.log('query');
    console.log(req.query);
    console.log('body');
    console.log(req.body);
    res.json({});
  }

  private async testFakeAddTrail(req: Request, res: Response) {
    console.log('I receive fake add request');
    const trail = new Trail();
    trail.difficulty = 4;
    trail.name = 'fake trailk';
    trail.description = '';
    trail.isVerified = false;
    const val = HikEasyApp.Instance?.EntityManager?.save(trail);
    console.log(val);
    res.json({});
  }

  private async testtest() {
    await this.testEmptyInsert();
  }

  private async testEmptyInsert() {
    const trail = new Trail();
    trail.difficulty = 4;
    trail.name = 'Dragon Back';
    trail.description = '';
    trail.isVerified = false;
    const value = await HikEasyApp.Instance?.EntityManager?.save(trail);
    console.log(value);
  }
}
