/*
  What: This is used to construct the database connedction with the HikEasy database
  Who: Wong Wing Yan 1155125194
  Where: backend mysql database connectiomn
  Why: We need to set up the databse before connect to it with typeorm
  How: use typeorm to connect to the database, and test the connection
*/

//imports
import { Connection, createConnection, EntityManager } from 'typeorm';
import { appInstance } from './index';

export class HikEasyApp {
  private databaseConnection: Connection | undefined = undefined;
  private entityManager: EntityManager | undefined = undefined;
  
  //get the app instance 
  static get Instance(): HikEasyApp {
    return appInstance;
  }
  //use to decode waypoints
  static readonly POLYLINE_PRECISION = 6;
  //set up the connection 
  get DatabaseConnection(): Connection | undefined {
    return this.databaseConnection;
  }

  get EntityManager(): EntityManager | undefined {
    return this.entityManager;
  }
  
  constructor() {
    this.tryConnectToDatabase();
  }
  //testing function to connect to the databse
  private tryConnectToDatabase() {
    createConnection({
      type: 'mysql',
      host: process.env['DB_HOST'],
      username: process.env['DB_USERNAME'],
      password: process.env['DB_PASSWORD'],
      database: process.env['DB_DATABASE'],
      // note: will need to write as *.js to properly target the compiled js files
      entities: [__dirname + '/entity/*.js'],
      synchronize: true,
      logging: false,
    })
      .then(async (connection) => {
        this.databaseConnection = connection;
        this.entityManager = this.databaseConnection.manager;
        console.log('Successfully connected to database.');
      })
      .catch((error) => console.log(error));
  }
}
