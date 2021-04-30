/*
  What: This is used to implement all the operation regarding the chat post in the events, we can POST and GET through the /chat endpoint to the server
  Who: Tsang Tsz Kin Brian 1155126813
  Where: endpoint for the /chat
  Why: To implement a endpoint to allow frontend to GET and POST, interacting with HikEasy database
  How: use typeorm to connect to mysql database, and allow frontend to use the endpoint to operate the data of the database
*/

//it reuse the reviewService.ts code
//useful import
import { Application, Request, Response } from 'express';
import { Chat } from '../entity/Chat';
import { Event } from '../entity/Event';
import { FirebaseAuthenticator } from '../FirebaseAuthenticator';
import { HikEasyApp } from '../HikEasyApp';
import { ResponseUtil } from '../util/ResponseUtil';

//Define class for the Chat
export class ChatService {
  //setting up the endpoint
  public constructor(app: Application) {
    app.get('/chat/get_all', this.getAllChats); //done
    app.get('/chat/get_all_by_event', this.getAllChatOfEvent_NoEventID); //done
    app.get('/chat/get_all_by_event/:eventID', this.getAllChatsOfEvent); //done
    app.post('/chat/publish_chat', this.publishChat_NoEventID); //done
    app.post(
      '/chat/publish_chat/:eventID',
      FirebaseAuthenticator.authenticate,
      // function (req: Request, res: Response, next: NextFunction) {
      //   passport.authenticate('jwt', { session: false })(req, res, next);
      // },
      this.publishChat
    );
  }

  //use typeorm to get all chats from database
  private async getAllChats(req: Request, res: Response) {
    //use typeorm
    const chats = await HikEasyApp.Instance.EntityManager?.find(Chat);
    if (chats == undefined) {
      // failed to connect to database
      res.json({ success: false, response: 'Error in getting chats' });
      return;
    } else {
      // ok
      res.json({
        success: true,
        response: chats,
      });
    }
  }

  //handle users using endpoint without params
  private async getAllChatOfEvent_NoEventID(req: Request, res: Response) {
    res.json({ success: false, response: 'Missing Event' });
    return;
  }

  //use typeorm to get all chats of the events
  private async getAllChatsOfEvent(req: Request, res: Response) {
    if (HikEasyApp.Instance.EntityManager == undefined) {
      res.json({ success: false, response: 'Cannot find the database' });
      return;
    }

    const targetEventID = parseInt(req.params['eventID']);
    if (Number.isNaN(targetEventID)) {
      res.json({ success: false, response: 'Invalid event ID' });
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
      where: [{ event: targetEventID }],
    });
    res.json({
      success: true,
      response: chats,
    });
    return;
  }
  private async publishChat_NoEventID(req: Request, res: Response) {
    res.json({ success: false, response: 'Missing Event ID' });
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
      return;
    }
    if (targetUser === undefined) {
      // auth failed
      ResponseUtil.respondWithInvalidUserID(res);
      return;
    }
    const eventID = Number.parseInt(req.params['eventID']);
    if (Number.isNaN(eventID)) {
      res.json({ success: false, response: 'Invalid eventID' });
      return;
    }
    const targetEvent = await HikEasyApp.Instance.EntityManager?.findOne(
      Event,
      eventID
    );
    if (targetEvent === undefined) {
      res.json({ success: false, response: 'Event not found' });
      return;
    }
    // default to empty string
    const chatMessage = req.body['comment'] ?? '';
    // things are OK
    // here in chat, it is always a new chat message
    // but still, we need to ensure the chat has contents
    if (chatMessage.length == 0) {
      res.json({ success: false, message: 'Chat is empty' });
      return;
    }
    const chat = new Chat();
    chat.user = targetUser;
    chat.event = targetEvent;
    chat.comment = chatMessage;

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
}
