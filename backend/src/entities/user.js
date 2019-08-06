"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var tweet_1 = require("./tweet");
var like_1 = require("./like");
var comment_1 = require("./comment");
var User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        typeorm_1.PrimaryGeneratedColumn()
    ], User.prototype, "id", void 0);
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "email", void 0);
    __decorate([
        typeorm_1.Column()
    ], User.prototype, "password", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return tweet_1.Tweet; }, function (tweet) { return tweet.user; })
    ], User.prototype, "tweets", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return like_1.Like; }, function (like) { return like.user; })
    ], User.prototype, "likes", void 0);
    __decorate([
        typeorm_1.OneToMany(function (type) { return comment_1.Comment; }, function (comment) { return comment.user; })
    ], User.prototype, "comments", void 0);
    User = __decorate([
        typeorm_1.Entity()
    ], User);
    return User;
}());
exports.User = User;
