# caption-contest

Simple Node/Express API with front end to retrieve and caption photos. Users can view a list of photos, then register to leave captions on photos.

This app was initialized with express-generator.

## Dependencies: 
    "bcrypt": "^5.0.1",
    "body-parser": "^1.19.2",
    "connect-redis": "^6.1.3",
    "cors": "^2.8.5",
    "dotenv": "^16.0.0",
    "ejs": "^3.1.6",
    "express": "^4.17.3",
    "express-flash": "^0.0.2",
    "express-session": "^1.17.2",
    "helmet": "^5.0.2",
    "ioredis": "^5.0.4",
    "mysql2": "^2.3.3",
    "node": "^17.7.2",
    "node-cache": "^5.1.2",
    "openapi": "^1.0.1",
    "passport": "^0.5.2",
    "passport-local": "^1.0.0",
    "path": "^0.12.7",
    "pg": "^8.7.3",
    "pg-hstore": "^2.3.4",
    "redis": "^4.0.4",
    "redis-server": "^1.2.2",
    "sequelize": "^6.18.0",
    "sequelize-cli": "^6.4.1",
    "swagger-jsdoc": "^6.1.0",
    "swagger-ui-express": "^4.3.0",
    "url": "^0.11.0"

## Running the app locally
Install project dependencies using `npm install`

Before you can run the project locally, you will need to setup the database:
```
psql postgres --u postgres
(psql postgres -U <username> -d <database>)

postgres-# CREATE ROLE root WITH LOGIN PASSWORD 'p@ssw0rd!';
postgres-# ALTER ROLE root CREATEDB;
postgres-# \q

psql postgres -U root

postgres=> CREATE DATABASE node_sequelize;
postgres=> GRANT ALL PRIVILEGES ON DATABASE node_sequelize TO root;
postgres=> \q
```

Run the Sequelize migration scripts using `sequelize db:migrate`

You can then run the project with `DEBUG=myapp:* npm start`

Once the app is running locally, you can access the API at `http://localhost:5000/`

## Testing with Swagger
Swagger documentation and testing available at `http://localhost:5000/docs`

To test with Swagger:
 - Add photos using `GET /photos`
 - Create a user using `POST /users`
 - Login as new user using `POST /users/login`
 - Authorize Swagger requests
   - Copy token returned from login
   - Click the Authorize button at the top
   - Paste in the auth token
   - Click Login.
 - Create a caption using `POST /captions`
 - Retrieve photos, captions, and user data using other endpoints.
   - endpoints with a Lock icon require a login token

## Resources
- https://www.codecademy.com
- https://swagger.io.docs
- https://sequelize.org/

Photos included in the source code of this project are from Reader's Digest, (https://www.rd.com/list/funny-photos/).

## Options for extension
- Implement admin role for users, capable of curating photos and managing users
- Implement voting feature for ranking captions
