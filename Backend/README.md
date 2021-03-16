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

# Build Instructions

This section describes the steps needed to prepare and use the environment of the backend sub-repo.

## Linting

One of us recommended using Prettier as the linter of JS/TS. Prettier is now listed inside `package.json` as one of the dependencies.

It seems that you will also need to install Prettier globally in your machine.

After installation, you may lint the entire Backend project by running the following command at `/Backend`:

```
prettier "./src/*" --save
```

The above command targets everything under `/src` to be linted. The `/build` directory contains build artifacts and linting them is unnecessary.

Prettier plugins may be optionally installed in your favourite IDE:

- In IntelliJ IDEA, the IDE should be able to detect Prettier being installed and provide some built-in buttons/features to lint
- In Visual Studio Code, there are Prettier extensions available for install. For maximum convenience, set the Prettier as the formatter in the workspace and enable "format on save".

## How to start the backend

You only need to run this command:

```
npm start
```

This will do 3 things:

1. Ensure packages are latest (through NPM)
2. Compile the TypeScript files
3. Start the backend service (should be at port 8080)

Later, as we deploy this to production server, the NPM module `forever` might be used to provide a keep-alive solution to the backend service.

1. a
2. a
3. a
