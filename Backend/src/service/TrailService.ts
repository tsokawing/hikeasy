import { Application, Request, Response } from "express";
import { Trail } from "../entity/Trail";
import { HikEasyApp } from "../HikEasyApp";

export class TrailService {

  public constructor(app: Application) {
    app.get("/trails/get_all", this.getAllTrails);
    app.get("/trails/fake_add", this.testFakeAddTrail);
    // this.testtest();
  }

  private async getAllTrails(req: Request, res: Response) {
    const trails = await HikEasyApp.Instance.EntityManager?.find(Trail);
    if (trails == undefined) {
      res.json({});
    } else {
      res.json(trails);
    }
  }

  private async testFakeAddTrail(req: Request, res: Response) {
    console.log("I receive fake add request");
    const trail = new Trail();
    trail.difficulty = 4;
    trail.trailName = "fake trailk";
    trail.description = "";
    trail.isVerified = false;
    const val = HikEasyApp.Instance?.EntityManager?.save(trail);
    // const value = await this?.appInstance.EntityManager?.save(trail);
    console.log(val);
    // console.log(value);
    // this?.appInstance.EntityManager?.save(trail)
    //     .then((result) => console.log(result))
    //     .catch((error) => console.log(error));
    // const value = await this?.appInstance.EntityManager?.save(trail);
    // console.log(value);
    // res.son();
    res.json({});
  }

  private async testtest() {
    await this.testEmptyInsert();
  }

  private async testEmptyInsert() {
    // while (this.appInstance.DatabaseConnection == undefined) {
    //     // spin!
    // }
    const trail = new Trail();
    trail.difficulty = 4;
    trail.trailName = "Dragon Back";
    trail.description = "";
    trail.isVerified = false;
    const value = await HikEasyApp.Instance?.EntityManager?.save(trail);
    console.log(value);
  }
}
