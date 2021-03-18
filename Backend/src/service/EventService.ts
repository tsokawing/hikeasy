import { Application, Request, Response } from 'express';
import { Event } from '../entity/Event';
import { HikEasyApp } from '../HikEasyApp';
import { ResponseUtil } from '../util/ResponseUtil';

export class EventService {
  public constructor(app: Application) {
    app.get('/events/get_all', this.getAllEvents);
    app.get('/events/get_specific/:eventID', this.getSpecificEvent);
    app.post('/events/add_event', this.addEvent);
    app.post('/events/update_event/:eventID', this.updateEvent);
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
    event.name = req.body['eventName'];
    event.description = req.body['eventDescription'] ?? '';
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
    console.log(eventID);
    if (Number.isNaN(eventID)) {
        res.json({
            success: false,
            message: 'Missing event name',
        });
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
    let somethingWasChanged = false;
    console.log(req.body['eventName']);
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
    console.log(req.body['eventDescription']);
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
    HikEasyApp.Instance.EntityManager.save(targetedEvent);
    res.json({
      success: true,
      message: 'UpdatedEvent',
    });
    return;
  }
}