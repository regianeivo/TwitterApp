import express from "express";
import bodyParser from "body-parser";
import { createDbConnection } from "./db";
import { getAuthController } from "../controllers/auth_controller";
import { getUserController } from "../controllers/user_controller";
import { getTweetsController } from "../controllers/tweet_controller";
import { getCommentsController } from "../controllers/comments_controller";
import { Connection } from "typeorm";
 
export async function createApp(conn?: Connection) {
 
   // Create db connection if a connection is not passed
   if (conn === undefined) {
       await createDbConnection();
   }
 
   // Creates app
   const app = express();
 
   // Server config to be able to send JSON
   app.use(bodyParser.json());
   app.use(bodyParser.urlencoded({ extended: true }));
 
   // Declare main path
   app.get("/", (req, res) => {
       res.send("This is the home page!");
   });
 
   // Declare controller instances
   const authController = getAuthController();
   const userController = getUserController();
   const tweetController = getTweetsController();
   const commentsController = getCommentsController();
 
   // Declare routes
   app.use("/api/v1/auth", authController);
   app.use("/api/v1/users", userController);
   app.use("/api/v1/tweets", tweetController);
   app.use("/api/v1/comments", commentsController);
 
   return app;
}

