/*
  What: This is used to implement all the operation regarding the events, we can POST and GET through the /event endpoint to the server
  Who: Wong Wing Yan 1155125194
  Where: endpoint for the /event
  Why: To implement a endpoint to allow frontend to GET and POST for the events, interacting with HikEasy database
  How: use typeorm to connect to mysql database, and allow frontend to use the endpoint to operate the events data of the database
*/

//imports
import { Application, Request, Response } from 'express';
import { Event } from '../entity/Event';
import { Trail } from '../entity/Trail';
import { Photo } from '../entity/Photo';
import { User } from '../entity/User';
import { HikEasyApp } from '../HikEasyApp';
import { ResponseUtil } from '../util/ResponseUtil';
import { UserUtil } from '../util/UserUtil';
import { FirebaseAuthenticator } from '../FirebaseAuthenticator';
import { WaypointsUtil } from '../util/WaypointsUtil';

//set up endpoint for the Events
export class EventService {
  public constructor(app: Application) {
    //endpoint for /events
    app.get('/events/get_all', this.getAllEvents);
    app.get('/events/get_specific/:eventID', this.getSpecificEvent);
    app.post('/events/add_event', this.addEvent);
    app.post('/events/update_event/:eventID', this.updateEvent);
    app.get('/events/get_photo/:eventID', this.getPhoto);
    app.post(
      '/events/join_event/:eventID',
      FirebaseAuthenticator.authenticate,
      this.handleUserJoinEvent
    );
    app.post(
      '/events/exit_event/:eventID',
      FirebaseAuthenticator.authenticate,
      this.handleUserExitEvent
    );
  }
  //Get all the events from the database with typeorm
  private async getAllEvents(req: Request, res: Response) {
    const events = await HikEasyApp.Instance.EntityManager?.find(Event);
    if (events == undefined) {
      // failed to connect to database
      ResponseUtil.respondWithDatabaseUnreachable(res);
    } else {
      //make a list of events
      events.forEach((event) => {
        event.participants.forEach((participant) => {
          UserUtil.stripSensitiveInfo(participant);
        });
        // The trail is undef
        if (event.trail !== undefined) {
          event.trail.displayCenter = WaypointsUtil.getCenterPositionForEncodedWaypoint(
            event.trail.waypoints
          );
        }
      });
      //success and return the list of events
      res.status(200).json(events);
    }
  }

  //Get all one specific event from the database with typeorm
  private async getSpecificEvent(req: Request, res: Response) {
    //parameter with eventID
    const targetEventID = parseInt(req.params['eventID']);
    if (Number.isNaN(targetEventID)) {
      res.json({
        //mo such event
        success: false,
        message: 'No matching event',
      });
      return;
    }
    //find event with the ID
    const event = await HikEasyApp.Instance.EntityManager?.findOne(
      Event,
      targetEventID
    );
    //event is undef
    if (event !== undefined) {
      event.participants.forEach((participant) =>
        UserUtil.stripSensitiveInfo(participant)
      );
      if (event.trail !== undefined) {
        event.trail.displayCenter = WaypointsUtil.getCenterPositionForEncodedWaypoint(
          event.trail.waypoints
        );
      }
    }
    //success and return the event
    res.json({
      success: true,
      response: event,
    });
    return;
  }

  //Add one event to the database
  private async addEvent(req: Request, res: Response) {
    //trailID as input parameter
    const event = new Event();
    const trailID = Number.parseInt(req.body['trailID']);
    if (Number.isNaN(trailID)) {
      ResponseUtil.respondWithInvalidTrailID(res);
      return;
    }
    //find the trail
    const targetTrail = await HikEasyApp.Instance.EntityManager?.findOne(
      Trail,
      trailID
    );
    //trail is undef
    if (targetTrail === undefined) {
      ResponseUtil.respondWithError(res, 'Trail not found');
      return;
    }
    //set the attribute for the event
    event.trail = targetTrail;
    event.name = req.body['eventName'];
    event.description = req.body['eventDescription'] ?? '';
    // client string in the format of yyyy-mm-dd HH:MM:ss (assume hkt)
    const eventTimestampStringified = req.body['eventTime'];
    const eventTime_MiddleValue: number = Date.parse(eventTimestampStringified);
    if (
      Number.isNaN(eventTime_MiddleValue) ||
      eventTime_MiddleValue < Date.now()
    ) {
      // invalid date: can be invalid format or "past date"
      ResponseUtil.respondWithError(res, 'Invalid date');
      return;
    }
    //parse the time 
    event.time = new Date(eventTime_MiddleValue);
    if (event.name === undefined) {
      res.json({
        success: false,
        message: 'Missing event name',
      });
      return;
    }
    //empty input for event name
    if (event.name.length == 0) {
      res.json({
        success: false,
        message: 'Event name cannot be empty',
      });
      return;
    }
    // no problem, can insert!
    if (HikEasyApp.Instance.EntityManager == undefined) {
      ResponseUtil.respondWithDatabaseUnreachable(res);
      return;
    }
    //success and response
    HikEasyApp.Instance.EntityManager.save(event);
    res.json({
      success: true,
      message: 'Event Added',
    });
  }
  
  //Update one specific event from the database with typeorm
  private async updateEvent(req: Request, res: Response) {
    //input parameter : eventID
    const eventID = parseInt(req.params['eventID']);
    if (Number.isNaN(eventID)) {
      ResponseUtil.respondWithInvalidEventID(res);
      return;
    }
    // need to check whether something has changed, respond false if nothing was changed
    if (HikEasyApp.Instance.EntityManager == undefined) {
      ResponseUtil.respondWithDatabaseUnreachable(res);
      return;
    }
    //find one event
    const targetedEvent = await HikEasyApp.Instance.EntityManager.findOne(
      Event,
      eventID
    );
    //found event is undef
    if (targetedEvent == undefined) {
      res.json({
        success: false,
        message: 'No such Event',
      });
      return;
    }
    //input parameter : userID
    const userID = Number.parseInt(req.body['userID']);
    if (Number.isNaN(userID)) {
      ResponseUtil.respondWithInvalidUserID(res);
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
    let somethingWasChanged = false;
    const updatedEventName = req.body['eventName'];
    if (updatedEventName !== undefined) {
      if (updatedEventName.length == 0) {
        // cannot be empty
        res.json({
          success: false,
          message: 'Event name cannot be empty',
        });
        return;
      }
      //set up the attribute
      targetedEvent.name = updatedEventName;
      somethingWasChanged = true;
    }
    // console.log(req.body['eventDescription']);
    const updatedDescription = req.body['eventDescription'];
    if (updatedDescription !== undefined) {
      targetedEvent.description = updatedDescription;
    }
    //no update in the attribute
    if (!somethingWasChanged) {
      res.json({
        success: false,
        message: 'Nothing to update',
      });
      return;
    }
    //set up the eventTime
    const eventTimestampStringified = req.body['eventTime'];
    const eventTime_MiddleValue: number = Date.parse(eventTimestampStringified);
    if (updatedDescription !== undefined) {
      targetedEvent.time = new Date(eventTime_MiddleValue);
    }
    //noting to update
    if (!somethingWasChanged) {
      res.json({
        success: false,
        message: 'Nothing to update',
      });
      return;
    }
    //success and respond
    HikEasyApp.Instance.EntityManager.save(targetedEvent);
    res.json({
      success: true,
      message: 'UpdatedEvent',
    });
    return;
  }
  
  //Get the filename of photo for one event
  private async getPhoto(req: Request, res: Response) {
    const eventID = parseInt(req.params['eventID']);
    if (HikEasyApp.Instance.EntityManager == undefined) {
      ResponseUtil.respondWithDatabaseUnreachable(res);
      return;
    }
    const subjectEvent = HikEasyApp.Instance.EntityManager.findOne(
      Event,
      eventID
    );
    if (subjectEvent === undefined) {
      ResponseUtil.respondWithInvalidTrailID(res);
      return;
    }
    // then find the photos' file names
    const photos = await HikEasyApp.Instance.EntityManager.find(Photo, {
      select: ['fileName'],
      where: { event: eventID },
    });
    res.json({ success: true, photoFileNames: photos });
  }
  //Allow user to join the event
  private async handleUserJoinEvent(req: Request, res: Response) {
    if (HikEasyApp.Instance.EntityManager === undefined) {
      ResponseUtil.respondWithDatabaseUnreachable(res);
      return;
    }
    const targetUser = await FirebaseAuthenticator.extractProperUserFromAuth(
      req
    );
    const eventID = req.params['eventID'];
    const targetEvent = await HikEasyApp.Instance.EntityManager?.findOne(
      Event,
      eventID
    );
    if (targetUser === undefined) {
      ResponseUtil.respondWithInvalidUserID(res);
      return;
    }
    if (targetEvent === undefined) {
      ResponseUtil.respondWithInvalidEventID(res);
      return;
    }
    // I assume it will also remove duplicate, so should be fine doing this
    if (targetEvent.participants === undefined) {
      // we could be handling an event that has no prior participants (aka undefined)
      targetEvent.participants = new Array<User>();
    }
    //succees and update the participants of the event
    targetEvent.participants.push(targetUser);
    HikEasyApp.Instance.EntityManager.save(targetEvent);
    res.json({
      success: true,
      message: 'OK',
    });
  }

  private async handleUserExitEvent(req: Request, res: Response) {
    if (HikEasyApp.Instance.EntityManager === undefined) {
      ResponseUtil.respondWithDatabaseUnreachable(res);
      return;
    }
    const targetUser = await FirebaseAuthenticator.extractProperUserFromAuth(
      req
    );
    const eventID = req.params['eventID'];
    const targetEvent = await HikEasyApp.Instance.EntityManager?.findOne(
      Event,
      eventID
    );
    if (targetUser === undefined) {
      ResponseUtil.respondWithInvalidUserID(res);
      return;
    }
    if (targetEvent === undefined) {
      ResponseUtil.respondWithInvalidEventID(res);
      return;
    }
    // directly remove the users; suggested from online docs
    if (targetEvent.participants !== undefined) {
      // has participants; just ignore if we have no participants
      targetEvent.participants = targetEvent.participants.filter(
        (participant) => {
          return participant.id !== targetUser.id;
        }
      );
    }
    //success and response
    HikEasyApp.Instance.EntityManager.save(targetEvent);
    res.json({
      success: true,
      message: 'OK',
    });
  }
}
