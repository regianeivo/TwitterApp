import { createConnection } from "typeorm";
import { Tweet } from "../entities/tweet";
import { User } from "../entities/user";
import { Like } from "../entities/like";
import { Comment } from "../entities/comment";
 
export async function createDbConnection() {
 
   // Read environment variables
   const DATABASE_HOST = process.env.DATABASE_HOST;
   const DATABASE_PASSWORD = process.env.DATABASE_PASSWORD;
   const DATABASE_USER = process.env.DATABASE_USER;
   const DATABASE_DB = process.env.DATABASE_DB;
 
   // Validate that environment variables are correct
   if (DATABASE_HOST === undefined) {
       throw new Error("Missing environment variable DATABASE_HOST");
   }
 
   if (DATABASE_PASSWORD === undefined) {
       throw new Error("Missing environment variable DATABASE_PASSWORD");
   }
 
   if (DATABASE_USER === undefined) {
       throw new Error("Missing environment variable DATABASE_USER");
   }
 
   if (DATABASE_DB === undefined) {
       throw new Error("Missing environment variable DATABASE_DB");
   }

   // Display the settings in the console so we can see if something is wrong
   console.log(
    `
        host. ${DATABASE_HOST}
        password. ${DATABASE_PASSWORD}
        user: ${DATABASE_USER}
        db: ${DATABASE_DB}
    `
   )
 
   // Open a database connection
   return await createConnection({
       type: "postgres",
       host: DATABASE_HOST,
       port: 5432,
       username: DATABASE_USER,
       password: DATABASE_PASSWORD,
       database: DATABASE_DB,
       entities: [
           Tweet,
           User,
           Comment,
           Like
       ],
       synchronize: true
   });
 
}
