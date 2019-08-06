import { getConnection, Repository } from "typeorm";
import { User } from "../src/entities/user";

export function getUserRepository(): Repository<User>{
        const connection = getConnection();
        return connection.getRepository(User);
}