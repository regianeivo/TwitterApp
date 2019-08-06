
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne } from "typeorm";
import { User } from "./user";
import { Like } from "./like";
import { Comment } from "./comment";

@Entity()
export class Tweet {

    @PrimaryGeneratedColumn()
    public id!: number;

    //reference to the user
    @Column()
    public userId!: number;

    @Column()
    public content!: string;
    
    @Column({ nullable: true})
    public date!: string;

    //An user can have many tweets but a tweet only belongs to an user
    @ManyToOne(type => User, user => user.tweets)
    public user!: User;

    //A tweet can have many comments but a comment only belongs to a tweet
    @OneToMany(type => Comment, comment => comment.tweet)
    public comments!: Comment[];

    // A tweet can have many likes but a like only belongs to a tweet
    @OneToMany(type => Like, like => like.tweet)
    public likes!: Like[];

}
