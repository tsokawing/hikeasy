/*
  What: This is used to implement all the operation regarding the review, we can POST and GET through the /review endpoint to the server
  Who: Wong Wing Yan 1155125194
  Where: endpoint for the /review
  Why: To implement a endpoint to allow frontend to GET and POST for the review, interacting with HikEasy database
  How: use typeorm to connect to mysql database, and allow frontend to use the endpoint to operate the reviews data of the database
*/

//imports
import { Application, Request, Response } from 'express';
import { Review } from '../entity/Review';
import { Trail } from '../entity/Trail';
import { FirebaseAuthenticator } from '../FirebaseAuthenticator';
import { HikEasyApp } from '../HikEasyApp';
import { ResponseUtil } from '../util/ResponseUtil';
import { UserUtil } from '../util/UserUtil';

//setting up the /review endpoint
export class ReviewService {
  public constructor(app: Application) {
    // /review endpoint
    app.get('/review/get_all', this.getAllReviews);
    app.get('/review/get_all_by_trail', this.getAllReviewOfTrail_NoTrailID);
    app.get('/review/get_all_by_trail/:trailID', this.getAllReviewsOfTrail);
    app.get('/review/get_all_by_user', this.getAllReviewsByUser_NoUserID);
    app.get('/review/get_all_by_user/:userID', this.getAllReviewsByUser);
    app.post('/review/publish_review', this.publishReview_NoTrailID);
    app.post(
      '/review/publish_review/:trailID',
      FirebaseAuthenticator.authenticate,
      this.publishReview
    );
    app.post('/review/delete_review', this.deleteReview_NoTrailID);
    app.post(
      '/review/delete_review/:trailID',
      FirebaseAuthenticator.authenticate,
      this.deleteReview
    );
  }
  
  //Get all the reviews in the database
  private async getAllReviews(req: Request, res: Response) {
    const reviews = await HikEasyApp.Instance.EntityManager?.find(Review);
    if (reviews == undefined) {
      // failed to connect to database
      ResponseUtil.respondWithDatabaseUnreachable(res);
    } else {
      // ok
      res.json({
        success: true,
        response: reviews,
      });
    }
  }
  // handle the problem of no trail id in /review endpoint
  private async getAllReviewOfTrail_NoTrailID(req: Request, res: Response) {
    ResponseUtil.respondWithMissingTrailID(res);
  }
  // Get the reviews for the trail
  private async getAllReviewsOfTrail(req: Request, res: Response) {
    if (HikEasyApp.Instance.EntityManager == undefined) {
      ResponseUtil.respondWithDatabaseUnreachable(res);
      return;
    }
    //parse the trailID 
    const targetTrailID = parseInt(req.params['trailID']);
    if (Number.isNaN(targetTrailID)) {
      ResponseUtil.respondWithInvalidTrailID(res);
      return;
    }
    // todo need to remove e.g. the user password fields! we cant just make it be like this!
    const reviews = await HikEasyApp.Instance.EntityManager?.find(Review, {
      join: {
        alias: 'review',
        leftJoinAndSelect: {
          user: 'review.user',
        },
      },
      where: [{ trail: targetTrailID }],
    });
    // make the reviews to list format
    reviews.forEach((item) => {
      UserUtil.stripSensitiveInfo(item.user);
    });
    //success and response with the review list
    res.json({
      success: true,
      response: reviews,
    });
    return;
  }
  // handle the problem of no user id in /review endpoint
  private async getAllReviewsByUser_NoUserID(req: Request, res: Response) {
    ResponseUtil.respondWithMissingUserID(res);
  }
  
  // Get the reviews for the user
  private async getAllReviewsByUser(req: Request, res: Response) {
    //parse the userID
    const targetUserID = parseInt(req.params['userID']);
    if (Number.isNaN(targetUserID)) {
      ResponseUtil.respondWithInvalidUserID(res);
      return;
    }
    //find the reviews with the userID
    const reviews = await HikEasyApp.Instance.EntityManager?.find(Review, {
      where: [{ user: targetUserID }],
    });
    // const reviews = await HikEasyApp.Instance.EntityManager?.createQueryBuilder(
    // Review,
    // 'review'
    // )
    // .where('review.trailId = :trailId', { trailId: targetUserID })
    // .getMany();
    //success and return reviews
    res.json({
      success: true,
      response: reviews,
    });
    return;
  }
  // handle the problem of no trail id in /review endpoint
  private async publishReview_NoTrailID(req: Request, res: Response) {
    ResponseUtil.respondWithMissingTrailID(res);
  }
  // publish the review for the trail
  private async publishReview(req: Request, res: Response) {
    // can be a new review, can be an updated review
    // check that all required details are here.

    // read req.user.user_id to obtain Firebase user ID for user lookup
    // console.log(req.user);

    let targetUser = undefined;
    //authenticate the user with JWT token
    try {
      targetUser = await FirebaseAuthenticator.extractProperUserFromAuth(req);
    } catch (error: unknown) {
      ResponseUtil.respondWithError_DirectlyFromException(res, error);
      return;
    }
    if (targetUser === undefined) {
      // auth failed
      ResponseUtil.respondWithInvalidUserID(res);
      return;
    }
    const trailID = Number.parseInt(req.params['trailID']);
    if (Number.isNaN(trailID)) {
      ResponseUtil.respondWithInvalidTrailID(res);
      return;
    }
    const targetTrail = await HikEasyApp.Instance.EntityManager?.findOne(
      Trail,
      trailID
    );
    if (targetTrail === undefined) {
      ResponseUtil.respondWithError(res, 'Trail not found');
      return;
    }

    // continue to check
    const trailRating = Number.parseInt(req.body['rating']);
    if (Number.isNaN(trailRating) || trailRating < 1 || trailRating > 5) {
      ResponseUtil.respondWithError(res, 'Invalid trail rating');
      return;
    }
    // default to empty string
    const trailComment = req.body['comment'] ?? '';

    // things are OK
    // load the existing review OR make a new review
    const review =
      (await HikEasyApp.Instance.EntityManager?.findOne(Review, {
        where: { user: targetUser, trail: targetTrail },
      })) ?? new Review();
    review.user = targetUser;
    review.trail = targetTrail;
    review.rating = trailRating;
    review.comment = trailComment;

    // no problem, can insert!
    // side effect: in mysql, if nothing is changed, then it will not trigger row-update at all
    if (HikEasyApp.Instance.EntityManager == undefined) {
      ResponseUtil.respondWithDatabaseUnreachable(res);
      return;
    }
    await HikEasyApp.Instance.EntityManager.save(review);
    // successfully inserted
    // todo what if we failed to insert at db level
    res.json({
      success: true,
      message: 'OK',
    });
  }
  // handle the problem of no trail id in /review endpoint
  private async deleteReview_NoTrailID(req: Request, res: Response) {
    ResponseUtil.respondWithMissingTrailID(res);
  }

  //delete the review of a user  
  private async deleteReview(req: Request, res: Response) {
    let targetUser = undefined;
    //authenicate the user with JWT token
    try {
      targetUser = await FirebaseAuthenticator.extractProperUserFromAuth(req);
    } catch (error: unknown) {
      ResponseUtil.respondWithError_DirectlyFromException(res, error);
      return;
    }
    if (targetUser === undefined) {
      // auth failed
      ResponseUtil.respondWithInvalidUserID(res);
      return;
    }

    const trailID = Number.parseInt(req.params['trailID']);
    if (Number.isNaN(trailID)) {
      ResponseUtil.respondWithInvalidTrailID(res);
      return;
    }
    const targetTrail = await HikEasyApp.Instance.EntityManager?.findOne(
      Trail,
      trailID
    );
    if (targetTrail === undefined) {
      ResponseUtil.respondWithError(res, 'Trail not found');
      return;
    }
    //find the reviews and delete 
    await HikEasyApp.Instance.EntityManager?.softDelete(Trail, {
      where: { user: targetUser, trail: targetTrail },
    });
    // success and response 
    res.json({
      success: true,
      message: 'OK',
    });
    return;
  }
}
