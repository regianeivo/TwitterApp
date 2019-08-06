
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { Tweet } from "./tweet";
import { Like } from "./like";
import { Comment } from "./comment";

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id!: number;

    @Column()
    public email!: string;

    @Column()
    public password!: string;

    //An user can have many tweets but a tweet only belongs to an user
    @OneToMany(type => Tweet, tweet => tweet.user)
    public tweets!: Tweet[];

    //An user can have many likes but a like only belongs to an user
    @OneToMany(type => Like, like => like.user)
    public likes!: Like[];

    //An user can have many comments but a comment only belongs to an user
    @OneToMany(type => Comment, comment => comment.user)
    public comments!: Comment[];

}
