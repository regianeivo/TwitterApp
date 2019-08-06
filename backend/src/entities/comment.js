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
var tweet_1 = require("./tweet");
var Comment = /** @class */ (function () {
    function Comment() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], Comment.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column()
    ], Comment.prototype, "userId", void 0);
    __decorate([
        typeorm_1.Column()
    ], Comment.prototype, "tweetId", void 0);
    __decorate([
        typeorm_1.Column()
    ], Comment.prototype, "content", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return tweet_1.Tweet; }, function (tweet) { return tweet.comments; })
    ], Comment.prototype, "tweet", void 0);
    __decorate([
        typeorm_1.ManyToOne(function (type) { return user_1.User; }, function (user) { return user.comments; })
    ], Comment.prototype, "user", void 0);
    Comment = __decorate([
        typeorm_1.Entity()
    ], Comment);
    return Comment;
}());
exports.Comment = Comment;
