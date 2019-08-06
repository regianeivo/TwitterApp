"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var tweet_1 = require("../entities/tweet");
function getTweetRepository() {
    var connection = typeorm_1.getConnection();
    return connection.getRepository(tweet_1.Tweet);
}
exports.getTweetRepository = getTweetRepository;
