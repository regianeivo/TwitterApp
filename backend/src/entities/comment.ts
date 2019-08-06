
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from "typeorm";
import { User } from "./user";
import { Tweet } from "./tweet";

@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    public id!: number;

    //reference to the user
    @Column()
    public userId!: number;

    //reference to the tweet
    @Column()
    public tweetId!: number;

    @Column()
    public content!: string;


    // A tweet can have many comments but a comment only belongs to one tweet
    @ManyToOne(type => Tweet, tweet => tweet.comments)
    public tweet!: Tweet;

    // An user can have many comments but a comment only belongs to an user
    @ManyToOne(type => User, user => user.comments)
    public user!: User;

}