import { getConnection, Repository } from "typeorm";
import { Like } from "../src/entities/like";

export function getLikeRepository(): Repository<Like>{
        const connection = getConnection();
        return connection.getRepository(Like);
}