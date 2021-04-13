import { Application, Request, Response } from 'express';
import { Event } from '../entity/Event';
import { Trail } from '../entity/Trail';
import { Photo } from '../entity/Photo';
import { User } from '../entity/User';
import { HikEasyApp } from '../HikEasyApp';
import { ResponseUtil } from '../util/ResponseUtil';

export class EventService {
  public constructor(app: Application) {
    app.get('/events/get_all', this.getAllEvents);
    app.get('/events/get_specific/:eventID', this.getSpecificEvent);
    app.post('/events/add_event', this.addEvent);
    app.post('/events/update_event/:eventID', this.updateEvent);
    app.get('/events/get_photo/:eventID', this.getPhoto);

    app.post('/events/join_event/:eventID', this.handleUserJoinEvent);
    app.post('/events/exit_event/:eventID', this.handleUserExitEvent);
  }

  private async getAllEvents(req: Request, res: Response) {
    const events = await HikEasyApp.Instance.EntityManager?.find(Event);
    if (events == undefined) {
      // failed to connect to database
      ResponseUtil.respondWithDatabaseUnreachable(res);
    } else {
      res.status(200).json(events);
    }
  }
  
  private async getSpecificEvent(req: Request, res: Response) {
    const targetEventID = parseInt(req.params['eventID']);
    if (Number.isNaN(targetEventID)) {
      res.json({
        message: 'No matching event',
      })
      return;
    }
    const event = await HikEasyApp.Instance.EntityManager?.findOne(Event,targetEventID);
    res.json({
        success: true,
        response: event,
      });
      return;
  }

  private async addEvent(req: Request, res: Response) {
    const event = new Event();
    const trailID = Number.parseInt(req.body['trailID']);
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
    event.time = new Date(eventTime_MiddleValue);
    if (event.name === undefined) {
      res.json({
        success: false,
        message: 'Missing event name',
      });
      return;
    }
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
    HikEasyApp.Instance.EntityManager.save(event);
    res.json({
      success: true,
      message: 'Event Added',
    });
  }

  private async updateEvent(req: Request, res: Response) {
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
    const targetedEvent = await HikEasyApp.Instance.EntityManager.findOne(Event,eventID);
    console.log(targetedEvent);
    if (targetedEvent== undefined) {
      res.json({
        success: false,
        message: 'No such Event',
      });
      return;
    }
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
      targetedEvent.name = updatedEventName;
      somethingWasChanged = true;
    }
    // console.log(req.body['eventDescription']);
    const updatedDescription = req.body['eventDescription'];
    if (updatedDescription !== undefined) {
      targetedEvent.description = updatedDescription;
    }
    if (!somethingWasChanged) {
      res.json({
        success: false,
        message: 'Nothing to update',
      });
      return;
    }
    const eventTimestampStringified = req.body['eventTime'];
    const eventTime_MiddleValue: number = Date.parse(eventTimestampStringified);
    if (updatedDescription !== undefined) {
      targetedEvent.time = new Date(eventTime_MiddleValue);
    }
    if (!somethingWasChanged) {
      res.json({
        success: false,
        message: 'Nothing to update',
      });
      return;
    }
    HikEasyApp.Instance.EntityManager.save(targetedEvent);
    res.json({
      success: true,
      message: 'UpdatedEvent',
    });
    return;
  }

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

  private async handleUserJoinEvent(req: Request, res: Response) {
    if (HikEasyApp.Instance.EntityManager === undefined) {
      ResponseUtil.respondWithDatabaseUnreachable(res);
      return;
    }
    const userID = req.body['userID'];
    const targetUser = await HikEasyApp.Instance.EntityManager?.findOne(
      User,
      userID
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
    const userID = req.body['userID'];
    const targetUser = await HikEasyApp.Instance.EntityManager?.findOne(
      User,
      userID
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
    targetEvent.participants = targetEvent.participants.filter(
      (participant) => {
        return participant.id !== targetUser.id;
      }
    );
    HikEasyApp.Instance.EntityManager.save(targetEvent);
    res.json({
      success: true,
      message: 'OK',
    });
  }
}
