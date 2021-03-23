# Backend Sub-Repo

This is the sub-repo of the backend of the Project.

In the initial design document, we decided to utilize NodeJS as the backend language. \
The majority has also agreed to use TypeScript together with NodeJS; \
in particular, Strict TypeScript is adopted. \
(Weak TypeScript is the variant of TypeScript caused by improper configuration of the TypeScript environment, allowing some TS errors to pass through the build process.) \
We have also decided to utilize MySQL as the data storage mechanism.

Package management is handled by NPM.

Database connection is handled by typeorm.

Code style enforcement/linting is handled by Prettier, with the assistance of some IDE plugins.

Deployment is handled by PM2. While originally, the NPM module "forever" was nominated to assist deployment, there was a problem in getting "forever" to work with the actual deployment, so PM2 is used instead.

# Build Instructions

This section describes the steps needed to prepare and use the environment of the backend sub-repo.

## Linting

One of us recommended using Prettier as the linter of JS/TS. Prettier is now listed inside `package.json` as one of the dependencies.

Prettier can be considered an extension of ESLint. The configuration of ESLint/Prettier in this sub-repo refers to this online guide: https://dev.to/caelinsutch/setting-up-a-typescript-nodejs-application-with-prettier-and-eslint-53jc

Linting configuartions are now properly set up in this sub-repo. All items in this sub-repo are under the command of the Prettier linter, but these are excluded (refer to `.eslintignore` for latest exclusion):

- Everything under `node_modules`
- Everything under `build`

To begin the linting process, run ONLY ONE of the following two commands:

- Lint only, detect problems:
  - `npm run lint`
- Lint AND FIX in-place:
  - `npm run lint:fix`

To make development easier, it is highly recommended to enable some form of auto-linting.

- In IntelliJ IDEA, the IDE should be able to detect ESLint/Prettier being installed and provide some built-in buttons/features to lint; details are omitted
- In Visual Studio Code, follow these steps to enable "auto-lint on save":
  1. Install the ESLint extension
  2. Do `Ctrl` + `Shift` + `P`, search/select `Open Workspace Settings (JSON)`
  3. A VS Code file `settings.json` is opened; paste this configuration inside the JSON object: `"editor.codeActionsOnSave": { "source.fixAll.eslint": true },`
  4. Wait a few minutes; from previous experiences, commands and procedures are sometimes still being set up in the background, and there will be occasional "command not found" errors if you try to invoke the ESLint plugin during that time

## How to start the backend

To run the backend locally for quick testing, you only need to run this command:

```
npm start
```

This will do 3 things:

1. Ensure packages are latest (through NPM)
2. Compile the TypeScript files
3. Start the backend service (should be at port 8080)

As we finalize our changes locally, we are ready to deploy the code in production.

## Production deployment

As mentioned above, we utilize the NPM module `PM2` to keep the backend service alive through crashes and faults.

We still need to manually install `PM2` beforehand though.

1. Install `PM2` globally by `npm install pm2 -g`
2. As a first-time user, also do `pm2 ls`. This will list the processes that PM2 is currently managing (which should be empty), with the side effect of awakening PM2 from slumber.
3. (Recommended) To allow PM2 to auto-start when the server restarts, do `pm2 startup` and follow their instructions to complete the necessary setup.

After PM2 is properly configured, simply execute the dedicated server starting script by doing `sh ./prod_server_start.sh`. This will do the following things, which is very similar to what `npm start` does but with a bit of variation:

1. Pull the latest code; here you will need to input your GitHub credentials to let Git pull latest code
2. Ensure packages are latest (through NPM)
3. Compile the TypeScript files
4. Using PM2, start the backend service
5. Release the command line and allow further commands; the backend is now running

To run the backend:
Add `.env` to the `./Backend` directory
- Content of the `.env`:
  ```
  DB_HOST=18.188.120.239
  DB_USERNAME=csci3100  
  DB_PASSWORD=hiking  
  DB_DATABASE=hikeasy  
  ```

# Backend Contents
We have finished the prototype of some api, inside the 'service' directory and we added endpoint for the api:

1. TrailService
2. EventService
3. UserService
4. ReviewService
