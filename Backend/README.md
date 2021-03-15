# Backend Sub-Repo
This is the sub-repo of the backend of the Project.

In the initial design document, we decided to utilize NodeJS as the backend language. \
The majority has also agreed to use TypeScript together with NodeJS; \
in particular, Strict TypeScript is adopted. \
(Weak TypeScript is the variant of TypeScript caused by improper configuration of the TypeScript environment, allowing some TS errors to pass through the build process.) \
We have also decided to utilize MySQL as the data storage mechanism.

Package management is handled by NPM.

Database connection is handled by typeorm.

# Build Instructions
This section describes the steps needed to prepare and use the environment of the backend sub-repo.

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
