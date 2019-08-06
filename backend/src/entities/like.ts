
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user";
import { Tweet } from "./tweet";

@Entity()
export class Like {

    @PrimaryGeneratedColumn()
    public id!: number;

    //reference to the user
    @Column()
    public userId!: number;

    //reference to the tweet
    @Column()
    public tweetId!: number;

    @Column()
    public isPositive!: boolean;

    // A tweet can have many likes but a like only belongs to a link
    @ManyToOne(type => Tweet, tweet => tweet.likes)
    public tweet!: Tweet;

    // An user can have many likes but a like only belongs to an user
    @ManyToOne(type => User, user => user.likes)
    public user!: User;

}