import { Application, Request, Response } from 'express';
import { Photo } from '../entity/Photo';
import { Trail } from '../entity/Trail';
import { User } from '../entity/User';
import { HikEasyApp } from '../HikEasyApp';
import { ResponseUtil } from '../util/ResponseUtil';
import { getRepository } from 'typeorm';
import { WaypointsUtil } from '../util/WaypointsUtil';
import { FirebaseAuthenticator } from '../FirebaseAuthenticator';

export class TrailService {
  public constructor(app: Application) {
    app.get('/trails/get_all', this.getAllTrails);
    app.get('/trails/get_specific', this.getSpecificTrail_NoTrailID);
    app.get('/trails/get_specific/:trailID', this.getSpecificTrail);
    app.post(
      '/trails/add_trail',
      FirebaseAuthenticator.authenticate,
      this.addTrail
    );
    app.post(
      '/trails/update_trail',
      FirebaseAuthenticator.authenticate,
      this.updateTrail_NoTrailID
    );
    app.post(
      '/trails/update_trail/:trailID',
      FirebaseAuthenticator.authenticate,
      this.updateTrail
    );
    app.post(
      '/trails/delete_trail',
      FirebaseAuthenticator.authenticate,
      this.deleteTrail_NoTrailID
    );
    app.post(
      '/trails/delete_trail/:trailID',
      FirebaseAuthenticator.authenticate,
      this.deleteTrail
    );

    app.post('/trails/upload_photo', this.uploadPhotosForTrail_NoTrailID);
    app.post('/trails/upload_photo/:trailID', this.uploadPhotosForTrail);
    app.post(
      '/trails/upload_profile_pic',
      this.uploadProfilePicForTrail_NoTrailID
    );
    app.post(
      '/trails/upload_profile_pic/:trailID',
      this.uploadProfilePicForTrail
    );
    app.get('/trails/get_trail_photos', this.getTrailPhotos_NoTrailID);
    app.get('/trails/get_trail_photos/:trailID', this.getTrailPhotos);
    app.get('/trails/get_photo/:fileName', this.returnPhotoWithFileName);
    app.get('/trails/get_photo', this.returnPhotoButThereIsNoGivenFileName);
    // app.post('/trails/delete_photo');
  }

  private async getAllTrails(req: Request, res: Response) {
    const trails = await HikEasyApp.Instance.EntityManager?.find(Trail);
    if (trails == undefined) {
      // failed to connect to database
      ResponseUtil.respondWithDatabaseUnreachable(res);
    } else {
      // ok
      // add trail center
      trails.forEach((trail, index) => {
        trails[
          index
        ].displayCenter = WaypointsUtil.getCenterPositionForEncodedWaypoint(
          trail.waypoints
        );
      });
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
    if (trail !== undefined) {
      trail.displayCenter = WaypointsUtil.getCenterPositionForEncodedWaypoint(
        trail?.waypoints
      );
    }
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
    trail.waypoints = req.body['trailWaypoints'] ?? '';
    trail.length = Number.parseFloat(req.body['trailLength']);
    trail.city = req.body['trailCity'] ?? '';
    if (trail.name === undefined) {
      ResponseUtil.respondWithError(res, 'Missing trail name');
      return;
    }
    if (trail.name.length == 0) {
      ResponseUtil.respondWithError(res, 'Trail name cannot be empty');
      return;
    }
    if (trail.difficulty === undefined) {
      ResponseUtil.respondWithError(res, 'Missing trail difficulty');
      return;
    }
    if (trail.difficulty < 0 || trail.difficulty > 5) {
      ResponseUtil.respondWithInvalidDifficulty(res);
      return;
    }
    if (Number.isNaN(trail.length) || trail.length == 0) {
      // we wont judge the length, but uit must exist
      ResponseUtil.respondWithError(res, 'Missing/invalid trail length');
      return;
    }
    if (trail.city.length == 0) {
      ResponseUtil.respondWithError(res, 'Missing city name');
      return;
    }
    // we wont judge the waypoints from the client side, and directly store them
    // no problem, can insert!
    if (HikEasyApp.Instance.EntityManager == undefined) {
      ResponseUtil.respondWithDatabaseUnreachable(res);
      return;
    }
    const test = await getRepository(Trail).save(trail);
    // successfully inserted
    // todo what if we failed to insert at db level
    res.json({
      success: true,
      message: test.id,
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
      ResponseUtil.respondWithError(res, 'No such trail');
      return;
    }
    let somethingWasChanged = false;
    const updatedTrailName = req.body['trailName'];
    if (updatedTrailName !== undefined) {
      if (updatedTrailName.length == 0) {
        // cannot be empty
        ResponseUtil.respondWithError(res, 'Trail name cannot be empty');
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
    const updatedWaypoints = req.body['waypoints'];
    if (updatedWaypoints !== undefined) {
      // todo confirm what kind of waypoint we are receivinn: stringified or encoded?
      targetedTrail.waypoints = updatedWaypoints;
    }
    const updatedLength = Number.parseFloat(req.body['trailLength']);
    if (!Number.isNaN(updatedLength) && updatedLength > 0) {
      targetedTrail.length = updatedLength;
    }
    const updatedCityName = req.body['trailCity'];
    if (updatedCityName !== undefined) {
      targetedTrail.city = updatedCityName;
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

  private async uploadPhotosForTrail_NoTrailID(req: Request, res: Response) {
    ResponseUtil.respondWithMissingTrailID(res);
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
    // load trailInfo, check it exists
    const targetTrailID = req.params['trailID'];
    const subjectTrail = await HikEasyApp.Instance.EntityManager.findOne(
      Trail,
      targetTrailID
    );
    if (subjectTrail === undefined) {
      ResponseUtil.respondWithInvalidTrailID(res);
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
            if (HikEasyApp.Instance.EntityManager == null) {
              // this should not happen but typescript keeps complaining about this
              uploadStatus.push({
                name: photo.name,
                mimetype: photo.mimetype,
                size: photo.size,
                accepted: false,
              });
            } else {
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

              // and important! we must write down the names of the files, so that we can later get them back
              const uploadingPhoto = new Photo();
              uploadingPhoto.trail = subjectTrail;
              uploadingPhoto.user = uploaderUser;
              uploadingPhoto.fileName = newName;
              HikEasyApp.Instance.EntityManager.save(uploadingPhoto);
            }
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

  private async uploadProfilePicForTrail_NoTrailID(
    req: Request,
    res: Response
  ) {
    ResponseUtil.respondWithMissingTrailID(res);
  }

  private async uploadProfilePicForTrail(req: Request, res: Response) {
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
    // load trailInfo, check it exists
    const targetTrailID = req.params['trailID'];
    const subjectTrail = await HikEasyApp.Instance.EntityManager.findOne(
      Trail,
      targetTrailID
    );
    if (subjectTrail === undefined) {
      ResponseUtil.respondWithInvalidTrailID(res);
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
        // note: profile pic can only be single file!
        const arrayOfPhotos = Array.isArray(req.files['photos'])
          ? req.files['photos']
          : [req.files['photos']];
        if (arrayOfPhotos.length > 1) {
          ResponseUtil.respondWithError(res, 'Too many files');
        }
        const nowTime = new Date();
        const profilePic = arrayOfPhotos[0];

        // ensure it is a photo
        if (
          !profilePic.mimetype.startsWith('image/') ||
          (!profilePic.name.endsWith('.jpg') &&
            !profilePic.name.endsWith('.jpeg') &&
            !profilePic.name.endsWith('.png'))
        ) {
          // not a photo! or, not accepted photo type! rejected
          uploadStatus.push({
            name: profilePic.name,
            mimetype: profilePic.mimetype,
            size: profilePic.size,
            accepted: false,
          });
        } else {
          // is a photo, can accept
          // refer to comments at the upload_photos endpoint, things are basically the same
          const fileNameSplit = profilePic.name.split('.');
          const fileExtensionNoDot = fileNameSplit[fileNameSplit.length - 1];
          const newName =
            uploaderUser.id.toString() +
            '-' +
            nowTime.getTime().toString() +
            '-0.' +
            fileExtensionNoDot;
          if (HikEasyApp.Instance.EntityManager == null) {
            // this should not happen but typescript keeps complaining about this
            uploadStatus.push({
              name: profilePic.name,
              mimetype: profilePic.mimetype,
              size: profilePic.size,
              accepted: false,
            });
          } else {
            // we save as a new name, keep the original name so that frontend approx knows what happened
            // and then move it to storage
            profilePic.mv('./uploads/' + newName);
            uploadStatus.push({
              name: profilePic.name,
              newName: newName,
              mimetype: profilePic.mimetype,
              size: profilePic.size,
              accepted: true,
            });

            // and important! we must write down the names of the files, so that we can later get them back
            if (HikEasyApp.Instance.EntityManager == undefined) {
              ResponseUtil.respondWithDatabaseUnreachable(res);
              return;
            }
            const targetTrail = await HikEasyApp.Instance.EntityManager.findOne(
              Trail,
              targetTrailID
            );
            if (targetTrail === undefined) {
              ResponseUtil.respondWithError(res, 'No such trail');
              return;
            }
            targetTrail.profilePic = newName;
            HikEasyApp.Instance.EntityManager.save(targetTrail);
          }
        }

        //return response
        res.send({
          success: true,
          message: 'OK; please see details',
          response: uploadStatus,
        });
      }
    } catch (err) {
      // sth bad happened! probably related to file saving etc
      res.json({
        success: false,
        message: err,
      });
    }
  }

  private async getTrailPhotos_NoTrailID(req: Request, res: Response) {
    ResponseUtil.respondWithMissingTrailID(res);
    return;
  }

  private async getTrailPhotos(req: Request, res: Response) {
    if (HikEasyApp.Instance.EntityManager == undefined) {
      ResponseUtil.respondWithDatabaseUnreachable(res);
      return;
    }
    const targetTrailID = req.params['trailID'];
    const subjectTrail = HikEasyApp.Instance.EntityManager.findOne(
      Trail,
      targetTrailID
    );
    if (subjectTrail === undefined) {
      ResponseUtil.respondWithInvalidTrailID(res);
      return;
    }
    // then find the photos' file names
    const photos = await HikEasyApp.Instance.EntityManager.find(Photo, {
      select: ['fileName'],
      where: { trail: targetTrailID },
    });
    // transform the array a bit
    const fileNameArray = new Array<string>();
    photos.forEach((foundPhoto) => {
      fileNameArray.push(foundPhoto.fileName);
    });
    // then return the json
    res.json({ success: true, photoFileNames: fileNameArray });
  }

  private async returnPhotoWithFileName(req: Request, res: Response) {
    const fileName = req.params['fileName'];
    // assume must exist
    // it could be "not found" because of testing data also getting an entry at prod server: they are same db
    // frontend need to handle that
    res.download('uploads/' + fileName, fileName, function (err: unknown) {
      if (err) {
        // some error occured
        res.sendStatus(404);
        const fullFileName = 'uploads/' + fileName;
        console.error(`Failed to send photo (${fullFileName}): ` + err);
      }
    });
  }

  private async returnPhotoButThereIsNoGivenFileName(
    req: Request,
    res: Response
  ) {
    ResponseUtil.respondWithError(res, 'Missing file name');
  }
}
