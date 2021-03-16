import {
  Connection,
  createConnection,
  EntityManager,
  getManager,
} from "typeorm";

export class HikEasyApp {
  private databaseConnection: Connection | undefined = undefined;
  private entityManager: EntityManager| undefined = undefined;

  get DatabaseConnection() {
    return this.databaseConnection;
  }

  get EntityManager() {
    return this.entityManager;
  }

  constructor() {
    this.tryConnectToDatabase();
  }

  private tryConnectToDatabase() {
    createConnection({
      type: "mysql",
      host: process.env["DB_HOST"],
      username: process.env["DB_USERNAME"],
      password: process.env["DB_PASSWORD"],
      database: process.env["DB_DATABASE"],
      entities: [__dirname + "/entity/*.ts"],
      synchronize: true,
      logging: false,
    })
      .then(async (connection) => {
        this.databaseConnection = connection;
        this.entityManager = getManager();
        console.log("Successfully connected to database.");
      })
      .catch((error) => console.log(error));
  }
}
