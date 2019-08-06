import * as express from "express";
import { Repository } from "typeorm";
import { getTweetRepository } from "../../repositories/tweet_repository";
import { Tweet } from "../entities/tweet";
import { authMiddleware, AuthenticatedRequest } from "../config/auth";
import * as joi from "joi";
import { getLikeRepository } from "../../repositories/like_repository";
import { Like } from "../entities/like";
 
export const tweetIdSchema = {
   id: joi.number()
};
 
export const tweetSchema = {
   content: joi.string(),
   date: joi.string()
};
 
// We pass the repository instance as an argument
// We use this pattern so we can unit test the handlers with ease
export function getHandlers(tweetRepository: Repository<Tweet>, likeRepository: Repository<Like>) {
 
   const getAllTweets = (req: express.Request, res: express.Response) => {
       (async () => {
           try {
               const tweets = await tweetRepository.find();
               res.json(tweets).send();
           } catch (err) {
               // Handle unexpected errors
               console.error(err);
               res.status(500)
                  .json({ error: "Internal server error"})
                  .send();
           }
       })();
   }
 
   const getTweetById = (req: express.Request, res: express.Response) => {
       (async () => {
           try {
 
               // Validate Id in URL
               const idStr = req.params.id;
               const tweetId = { id: parseInt(idStr) };
               const idValidationresult = joi.validate(tweetId, tweetIdSchema);
              
               if (idValidationresult.error) {
                   res.status(400).json({ error: "Bad request" }).send();
               } {
                   const link = await tweetRepository.createQueryBuilder("tweet")
                                                    .leftJoinAndSelect("tweet.comments", "comment")
                                                    .leftJoinAndSelect("tweet.user", "user")
                                                    .leftJoinAndSelect("tweet.votes", "like")
                                                    .where("tweet.id = :id", { id: tweetId.id })
                                                    .getOne();
                   if (tweetId === undefined) {
                       res.status(404)
                          .json({ error: "Not found"})
                          .send();
                   } else {
                       res.json(tweetId).send();
                   }
               }
           } catch (err) {
               // Handle unexpected errors
               console.error(err);
               res.status(500)
                  .json({ error: "Internal server error"})
                  .send();
           }
       })();
   }
 
   const createTweet = (req: express.Request, res: express.Response) => {
       (async () => {
           try {
              
               // The request userId property is set by the authMiddleware
               // if it is undefined it means that we forgot the authMiddleware
               if ((req as AuthenticatedRequest).userId === undefined) {
                   throw new Error("The request is not authenticated! Please ensure that authMiddleware is used");
               }
 
               // Read and validate the link from the request body
               const newTweet = req.body;
               const result = joi.validate(newTweet, tweetSchema);
 
               if (result.error) {
                   res.json({ msg: `Invalid user details in body!`}).status(400).send();
               } else {
 
                   // Create new tweet
                   const tweetToBeSaved = new Tweet();
                   tweetToBeSaved.userId = (req as AuthenticatedRequest).userId;
                   tweetToBeSaved.content = newTweet.content;
                   tweetToBeSaved.date = newTweet.date;
                   const savedTweet = await tweetRepository.save(tweetToBeSaved);
                   res.json(savedTweet).send();
               }
 
           } catch (err) {
               // Handle unexpected errors
               console.error(err);
               res.status(500)
                  .json({ error: "Internal server error"})
                  .send();
           }
       })();
   }
 
   const deleteTweetById = (req: express.Request, res: express.Response) => {
       (async () => {
           try {
 
               // The request userId property is set by the authMiddleware
               // if it is undefined it means that we forgot the authMiddleware
               if ((req as AuthenticatedRequest).userId === undefined) {
                   throw new Error("The request is not authenticated! Please ensure that authMiddleware is used");
               }
 
               // Validate Id in URL
               const idStr = req.params.id;
               const tweetId = { id: parseInt(idStr) };
               const idValidationresult = joi.validate(tweetId, tweetIdSchema);
              
               if (idValidationresult.error) {
                   res.status(400).json({ error: "Bad request" }).send();
               } else {
 
                   // Try to find link to be deleted
                   const tweet = await tweetRepository.findOne(tweetId.id);
 
                   // If link not found return 404 not found
                   if (tweet === undefined) {
                       res.status(404)
                          .json({ error: "Not found"})
                          .send();
                   } else {
 
                       // If lik was found, remove it from DB
                       await tweetRepository.remove(tweet);
                       res.json({ msg: "OK" }).send();
                   }
               }
           } catch (err) {
               // Handle unexpected errors
               console.error(err);
               res.status(500)
                  .json({ error: "Internal server error"})
                  .send();
           }
       })();
   }
 
   const uplikeTweet = (req: express.Request, res: express.Response) => {
       (async () => {
 
           try {
 
               // The request userId property is set by the authMiddleware
               // if it is undefined it means that we forgot the authMiddleware
               if ((req as AuthenticatedRequest).userId === undefined) {
                   throw new Error("The request is not authenticated! Please ensure that authMiddleware is used");
               }
 
               // Validate Id in URL
               const idStr = req.params.id;
               const tweetId = { id: parseInt(idStr) };
               const idValidationresult = joi.validate(tweetId, tweetIdSchema);
              
               if (idValidationresult.error) {
                   res.status(400).json({ error: "Bad request" }).send();
               } else {
 
                   // Try to find previous vote by same user
                   const like = await likeRepository.findOne({
                       where: {
                           tweetId: tweetId.id,
                           userId: (req as AuthenticatedRequest).userId
                       }
                   });
 
                   // The user has already voted
                   if (like !== undefined && like.isPositive === false) {
 
                       // If the like was negative we remove it
                       await likeRepository.remove(like);
                       res.status(200).json({ ok: "ok" }).send();
                   } else if (like !== undefined && like.isPositive === true) {
 
                       // if the like was positive we cannot vote again
                       res.status(403).json({ error: "Forbidden" }).send();
                   } else {
 
                       // If there was no like we create it
                       const likeToBeSaved = new Like();
                       likeToBeSaved.isPositive = true;
                       likeToBeSaved.tweetId = tweetId.id;
                       likeToBeSaved.userId = (req as AuthenticatedRequest).userId;
                       await likeRepository.save(likeToBeSaved);
                       res.status(200).json({ ok: "ok" }).send();
                   }
               }
              
           } catch (err) {
               // Handle unexpected errors
               console.error(err);
               res.status(500)
                  .json({ error: "Internal server error"})
                  .send();
           }
 
       })();
   }
 
   const downlikeTweet = (req: express.Request, res: express.Response) => {
       (async () => {
 
           try {
 
               // The request userId property is set by the authMiddleware
               // if it is undefined it means that we forgot the authMiddleware
               if ((req as AuthenticatedRequest).userId === undefined) {
                   throw new Error("The request is not authenticated! Please ensure that authMiddleware is used");
               }
 
               // Validate Id in URL
               const idStr = req.params.id;
               const tweetId = { id: parseInt(idStr) };
               const idValidationresult = joi.validate(tweetId, tweetIdSchema);
              
               if (idValidationresult.error) {
                   res.status(400).json({ error: "Bad request" }).send();
               } else {
 
                   // Try to find previous vote by same user
                   const like = await likeRepository.findOne({
                       where: {
                           linkId: tweetId.id,
                           userId: (req as AuthenticatedRequest).userId
                       }
                   });
 
                   // The user has already liked
                   if (like !== undefined && like.isPositive === true) {
 
                       // If the like was positive we remove it
                       await likeRepository.remove(like);
                       res.status(200).json({ ok: "ok" }).send();
                   } else if (like !== undefined && like.isPositive === false) {
 
                       // if the like was negative we cannot vote again
                       res.status(403).json({ error: "Forbidden" }).send();
                   } else {
 
                       // If there was no like we create it
                       const likeToBeSaved = new Like();
                       likeToBeSaved.isPositive = false;
                       likeToBeSaved.tweetId = tweetId.id;
                       likeToBeSaved.userId = (req as AuthenticatedRequest).userId;
                       await likeRepository.save(likeToBeSaved);
                       res.status(200).json({ ok: "ok" }).send();
                   }
 
               }
 
              
           } catch (err) {
               // Handle unexpected errors
               console.error(err);
               res.status(500)
                  .json({ error: "Internal server error"})
                  .send();
           }
 
       })();
   }
 
   return {
       getAllTweets,
       getTweetById,
       createTweet,
       deleteTweetById,
       uplikeTweet,
       downlikeTweet
   };
 
}
 
export function getTweetsController() {
 
   const tweetRepository = getTweetRepository();
   const likeRepository = getLikeRepository();
   const handlers = getHandlers(tweetRepository, likeRepository);
   const router = express.Router();
 
   // Public
   router.get("/", handlers.getAllTweets);
   router.get("/:id", handlers.getTweetById);
 
   // Private
   router.post("/", authMiddleware, handlers.createTweet);
   router.delete("/:id", authMiddleware, handlers.deleteTweetById);
   router.post("/:id/uplike", authMiddleware, handlers.uplikeTweet);
   router.post("/:id/downlike", authMiddleware, handlers.downlikeTweet);
 
   return router;
}
