import { Connection, createConnection, EntityManager } from 'typeorm';
import { User } from './entity/User';
import { appInstance } from './index';

export class HikEasyApp {
  private databaseConnection: Connection | undefined = undefined;
  private entityManager: EntityManager | undefined = undefined;

  static get Instance(): HikEasyApp {
    return appInstance;
  }

  get DatabaseConnection(): Connection | undefined {
    return this.databaseConnection;
  }

  get EntityManager(): EntityManager | undefined {
    return this.entityManager;
  }

  constructor() {
    this.tryConnectToDatabase();
  }

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
