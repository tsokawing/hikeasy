import { Application, Request, Response } from 'express';
import { Review } from '../entity/Review';
import { Trail } from '../entity/Trail';
import { User } from '../entity/User';
import { HikEasyApp } from '../HikEasyApp';
import { ResponseUtil } from '../util/ResponseUtil';

export class ReviewService {
  public constructor(app: Application) {
    app.get('/review/get_all', this.getAllReviews);
    app.get('/review/get_all_by_trail/:trailID', this.getAllReviewsOfTrail);
    app.get('/review/get_all_by_user/:userID', this.getAllReviewsByUser);
    app.post('/review/publish_review/:trailID', this.publishReview);
    app.post('/review/delete_review/:trailID', this.deleteReview);
  }

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

  private async getAllReviewsOfTrail(req: Request, res: Response) {
    const targetTrailID = parseInt(req.params['trailID']);
    if (Number.isNaN(targetTrailID)) {
      ResponseUtil.respondWithInvalidTrailID(res);
      return;
    }
    const reviews = await HikEasyApp.Instance.EntityManager?.find(Review, {
      where: [{ trailID: targetTrailID }],
    });
    res.json({
      success: true,
      response: reviews,
    });
    return;
  }

  private async getAllReviewsByUser(req: Request, res: Response) {
    const targetUserID = parseInt(req.params['userID']);
    if (Number.isNaN(targetUserID)) {
      ResponseUtil.respondWithInvalidUserID(res);
      return;
    }
    const reviews = await HikEasyApp.Instance.EntityManager?.find(Review, {
      where: [{ userID: targetUserID }],
    });
    res.json({
      success: true,
      response: reviews,
    });
    return;
  }

  private async publishReview(req: Request, res: Response) {
    // can be a new review, can be an updated review
    // check that all required details are here.

    const userID = Number.parseInt(req.body['userID']);
    if (Number.isNaN(userID)) {
      ResponseUtil.respondWithInvalidUserID(res);
      return;
    }
    const trailID = Number.parseInt(req.params['trailID']);
    if (Number.isNaN(trailID)) {
      ResponseUtil.respondWithInvalidTrailID(res);
      return;
    }

    const targetUser = await HikEasyApp.Instance.EntityManager?.findOne(
      User,
      userID
    );
    if (targetUser === undefined) {
      ResponseUtil.respondWithError(res, 'User not found');
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
    HikEasyApp.Instance.EntityManager.save(review);
    // successfully inserted
    // todo what if we failed to insert at db level
    res.json({
      success: true,
      message: 'OK',
    });
  }

  private async deleteReview(req: Request, res: Response) {
    const userID = Number.parseInt(req.body['userID']);
    if (Number.isNaN(userID)) {
      ResponseUtil.respondWithInvalidUserID(res);
      return;
    }
    const trailID = Number.parseInt(req.params['trailID']);
    if (Number.isNaN(trailID)) {
      ResponseUtil.respondWithInvalidTrailID(res);
      return;
    }

    const targetUser = await HikEasyApp.Instance.EntityManager?.findOne(
      User,
      userID
    );
    if (targetUser === undefined) {
      ResponseUtil.respondWithError(res, 'User not found');
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

    await HikEasyApp.Instance.EntityManager?.softDelete(Trail, {
      where: { user: targetUser, trail: targetTrail },
    });
    res.json({
      success: true,
      message: 'OK',
    });
    return;
  }
}
