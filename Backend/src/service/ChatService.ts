import { Application, Request, Response } from 'express';
import { Review } from '../entity/Review';
import { Chat } from '../entity/Chat';
import { Event } from '../entity/Event';
import { Trail } from '../entity/Trail';
import { FirebaseAuthenticator } from '../FirebaseAuthenticator';
import { HikEasyApp } from '../HikEasyApp';
import { ResponseUtil } from '../util/ResponseUtil';
import { UserUtil } from '../util/UserUtil';


export class EventService {
  public constructor(app: Application) {
    app.get('/chat/get_all', this.getAllChats);//done
    app.get('/chat/get_all_by_event', this.getAllChatOfEvent_NoEventID); //done
    app.get('/chat/get_all_by_event/:eventID', this.getAllChatsOfEvent);//done
    app.post('/chat/publish_chat', this.publishChat_NoEventID); //done

    app.post(
      '/chat/publish_chat/:eventID',
      FirebaseAuthenticator.authenticate,
      // function (req: Request, res: Response, next: NextFunction) {
      //   passport.authenticate('jwt', { session: false })(req, res, next);
      // },
      this.publishChat
    );

    

    //Not used for demo
    // app.get('/review/get_all_by_user', this.getAllReviewsByUser_NoUserID);
    // app.get('/review/get_all_by_user/:userID', this.getAllReviewsByUser);
    // app.post('/review/delete_review', this.deleteReview_NoTrailID);
    // app.post(
    //     '/review/delete_review/:trailID',
    //     FirebaseAuthenticator.authenticate,
    //     this.deleteReview
    //   );
  }

  private async getAllChats(req: Request, res: Response) {
    const chats = await HikEasyApp.Instance.EntityManager?.find(Chat);
    if (chats == undefined) {
      // failed to connect to database
      res.json({success: false, response: "Error in getting chats"})
      return;
    } else {
      // ok
      res.json({
        success: true,
        response: chats,
      });
    }
  }

  private async getAllChatOfEvent_NoEventID(req: Request, res: Response) {
    res.json({success: false, response: "Missing Event"})
    return;
  }


  private async getAllChatsOfEvent(req: Request, res: Response) {
    if (HikEasyApp.Instance.EntityManager == undefined) {
        res.json({success: false, response: "Cannot find the database"})
        return;
    }

    const targetEventID = parseInt(req.params['eventID']);
    if (Number.isNaN(targetEventID)) {
        res.json({success: false, response: "Invalid event ID"})
      return;
    }
    // todo need to remove e.g. the user password fields! we cant just make it be like this!
    const chats = await HikEasyApp.Instance.EntityManager?.find(Chat, {
      join: {
        alias: 'chat',
        leftJoinAndSelect: {
          user: 'chat.user',
        },
      },
      where: [{ event : targetEventID }],
    });
    // const reviews = await HikEasyApp.Instance.EntityManager?.createQueryBuilder(
    // Review,
    // 'review'
    // )
    // .where('review.trailId = :trailId', { trailId: targetTrailID })
    // .getMany();
    res.json({
      success: true,
      response: chats,
    });
    return;
  }
  private async publishChat_NoEventID(req: Request, res: Response) {
    res.json({success: false, response: "Missing Event ID"})
  }


  private async publishChat(req: Request, res: Response) {
    // can be a new review, can be an updated review
    // check that all required details are here.

    // read req.user.user_id to obtain Firebase user ID for user lookup
    // console.log(req.user);
    let targetUser = undefined;
    try {
      targetUser = await FirebaseAuthenticator.extractProperUserFromAuth(req);
    } catch (error: unknown) {
      ResponseUtil.respondWithError_DirectlyFromException(res, error);
    }
    if (targetUser === undefined) {
      // auth failed
      ResponseUtil.respondWithInvalidUserID(res);
      return;
    }
    const eventID = Number.parseInt(req.params['eventID']);
    if (Number.isNaN(eventID)) {
      res.json({success: false, response: "Invalid eventID"})
      return;
    }
    const targetEvent = await HikEasyApp.Instance.EntityManager?.findOne(
      Event,
      eventID
    );
    if (targetEvent === undefined) {
      res.json({success: false, response: "Event not found"})
      return;
    }
    // default to empty string
    const eventChat = req.body['comment'] ?? '';
    // things are OK
    // load the existing review OR make a new review
    const chat =
      (await HikEasyApp.Instance.EntityManager?.findOne(Chat, {
        where: { user: targetUser, event: targetEvent },
      })) ?? new Chat();
    chat.user = targetUser;
    chat.event = targetEvent;
    chat.comment = eventChat;

    // no problem, can insert!
    // side effect: in mysql, if nothing is changed, then it will not trigger row-update at all
    if (HikEasyApp.Instance.EntityManager == undefined) {
      ResponseUtil.respondWithDatabaseUnreachable(res);
      return;
    }
    await HikEasyApp.Instance.EntityManager.save(chat);
    // successfully inserted
    // todo what if we failed to insert at db level
    res.json({
      success: true,
      message: 'The Chat is posted',
    });
  }

//   private async getAllReviewsByUser_NoUserID(req: Request, res: Response) {
//     ResponseUtil.respondWithMissingUserID(res);
//   }

//   private async getAllReviewsByUser(req: Request, res: Response) {
//     const targetUserID = parseInt(req.params['userID']);
//     if (Number.isNaN(targetUserID)) {
//       ResponseUtil.respondWithInvalidUserID(res);
//       return;
//     }
//     const reviews = await HikEasyApp.Instance.EntityManager?.find(Review, {
//       where: [{ user: targetUserID }],
//     });
//     // const reviews = await HikEasyApp.Instance.EntityManager?.createQueryBuilder(
//     // Review,
//     // 'review'
//     // )
//     // .where('review.trailId = :trailId', { trailId: targetUserID })
//     // .getMany();
//     res.json({
//       success: true,
//       response: reviews,
//     });
//     return;
//   }

//   private async deleteReview_NoTrailID(req: Request, res: Response) {
//     ResponseUtil.respondWithMissingTrailID(res);
//   }

//   private async deleteReview(req: Request, res: Response) {
//     let targetUser = undefined;
//     try {
//       targetUser = await FirebaseAuthenticator.extractProperUserFromAuth(req);
//     } catch (error: unknown) {
//       ResponseUtil.respondWithError_DirectlyFromException(res, error);
//       return;
//     }
//     if (targetUser === undefined) {
//       // auth failed
//       ResponseUtil.respondWithInvalidUserID(res);
//       return;
//     }

//     const trailID = Number.parseInt(req.params['trailID']);
//     if (Number.isNaN(trailID)) {
//       ResponseUtil.respondWithInvalidTrailID(res);
//       return;
//     }
//     const targetTrail = await HikEasyApp.Instance.EntityManager?.findOne(
//       Trail,
//       trailID
//     );
//     if (targetTrail === undefined) {
//       ResponseUtil.respondWithError(res, 'Trail not found');
//       return;
//     }

//     await HikEasyApp.Instance.EntityManager?.softDelete(Trail, {
//       where: { user: targetUser, trail: targetTrail },
//     });
//     res.json({
//       success: true,
//       message: 'OK',
//     });
//     return;
//   }
}