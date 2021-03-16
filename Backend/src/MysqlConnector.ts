import "reflect-metadata";
import {createConnection} from "typeorm";
import {User} from "./entity/User";

export function connectTest()
{
    createConnection({
        type: "mysql",
        // host: "172.31.44.209",
        host: "localhost",
        // host: "http://ec2-18-188-120-239.us-east-2.compute.amazonaws.com",
        // port: 3306,
        username: "csci3100",
        password: "hiking",
        database: "hikeasy",
        entities: [
           __dirname + "/entity/*.ts"
        ],
        synchronize: true,
        logging: false
      }).then(async connection => {
        const rawData = await connection.query(`SELECT * FROM trails`);
        console.log(rawData);
      }).catch(error => console.log(error));
      
    }    


