"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var like_1 = require("../entities/like");
function getLikeRepository() {
    var connection = typeorm_1.getConnection();
    return connection.getRepository(like_1.Like);
}
exports.getLikeRepository = getLikeRepository;
