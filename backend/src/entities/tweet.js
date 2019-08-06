"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var user_1 = require("./user");
var like_1 = require("./like");
var comment_1 = require("./comment");
var Tweet = /** @class */ (function () {
    function Tweet() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Tweet.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column()
    ], Tweet.prototype, "userId", void 0);
    __decorate([
        typeorm_1.Column()
    ], Tweet.prototype, "content", void 0);
    __decorate([
        typeorm_1.Column({ nullable: true })
    ], Tweet.prototype, "date", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return user_1.User; }, function (user) { return user.tweets; })
    ], Tweet.prototype, "user", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return comment_1.Comment; }, function (comment) { return comment.tweet; })
    ], Tweet.prototype, "comments", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return like_1.Like; }, function (like) { return like.tweet; })
    ], Tweet.prototype, "likes", void 0);
    Tweet = __decorate([
        typeorm_1.Entity()
    ], Tweet);
    return Tweet;
}());
exports.Tweet = Tweet;
