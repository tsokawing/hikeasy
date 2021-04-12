import { Application, Request, Response } from 'express';
import { Photo } from '../entity/Photo';
import { Trail } from '../entity/Trail';
import { User } from '../entity/User';
import { Event } from '../entity/Event';
import { HikEasyApp } from '../HikEasyApp';
import { ResponseUtil } from '../util/ResponseUtil';

export class ImageService {
  public constructor(app: Application) {
    app.get('/image/', this.returnPhotoButThereIsNoGivenFileName);
    app.get('/image/:fileName', this.returnPhotoWithFileName);
    app.post('/image/upload', this.handleUploadPhotos);
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

  private async handleUploadPhotos(req: Request, res: Response) {
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
    const eventID = req.body['eventID'];
    if (eventID === undefined) {
      ResponseUtil.respondWithMissingUserID(res);
      return;
    }
    if (HikEasyApp.Instance.EntityManager == undefined) {
      ResponseUtil.respondWithDatabaseUnreachable(res);
      return;
    }
    // load user object/check user exists
    const uploaderEvent = await HikEasyApp.Instance.EntityManager.findOne(
      Event,
      eventID
    );
    if (uploaderEvent === undefined) {
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
              uploadingPhoto.user = uploaderUser;
              uploadingPhoto.event = uploaderEvent;
              uploadingPhoto.fileName = newName;
              HikEasyApp.Instance.EntityManager.save(uploadingPhoto);
            }
          }
        });

        // return response
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
}
