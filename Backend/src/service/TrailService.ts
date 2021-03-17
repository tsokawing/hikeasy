import { Application, Request, Response } from "express";
import { Trail } from "../entity/Trail";
import { HikEasyApp } from "../HikEasyApp";

export class TrailService {

    public constructor(app: Application) {
        app.get("/trails/get_all", this.getAllTrails);
        app.get("/trails/fake_add", this.testFakeAddTrail);
        app.get("/trails/search_test", this.searchSomeTrailTest);
        app.post("/trails/post_test", this.postTest);
        // this.testtest();
    }

    private async getAllTrails(req: Request, res: Response) {
        const trails = await HikEasyApp.Instance.EntityManager?.find(Trail);
        if (trails == undefined) {
            // failed to connect to database
            res.status(503).json({
                message: "Database unreachable"
            });
        } else {
            // ok
            res.status(200).json(trails);
        }
    }

    private async addTrail(req: Request, res: Response) {

    }

    private async searchSomeTrailTest(req: Request, res: Response){
        console.log(req.query['a']);
        res.json({});
    }

    private async postTest(req: Request, res: Response) {
        console.log('query')
        console.log(req.query);
        console.log('body')
        console.log(req.body);
        res.json({});
    }
    
    private async testFakeAddTrail(req: Request, res: Response) {
        console.log("I receive fake add request");
        const trail = new Trail();
        trail.difficulty = 4;
        trail.trailName = "fake trailk";
        trail.description = "";
        trail.isVerified = false;
        const val = HikEasyApp.Instance?.EntityManager?.save(trail);
        console.log(val);
        res.json({});
    }

    private async testtest() {
        await this.testEmptyInsert();
    }

    private async testEmptyInsert() {

        const trail = new Trail();
        trail.difficulty = 4;
        trail.trailName = "Dragon Back";
        trail.description = "";
        trail.isVerified = false;
        const value = await HikEasyApp.Instance?.EntityManager?.save(trail);
        console.log(value);
    }
}
