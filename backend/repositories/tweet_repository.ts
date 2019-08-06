import { getConnection, Repository } from "typeorm";
import { Tweet } from "../src/entities/tweet";

export function getTweetRepository(): Repository<Tweet>{
        const connection = getConnection();
        return connection.getRepository(Tweet);
}