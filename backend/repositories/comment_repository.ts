import { getConnection, Repository } from "typeorm";
import { Comment } from "../src/entities/comment";

export function getCommentRepository(): Repository<Comment>{
        const connection = getConnection();
        return connection.getRepository(Comment);
}