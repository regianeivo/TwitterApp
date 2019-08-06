"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var comment_1 = require("../entities/comment");
function getCommentRepository() {
    var connection = typeorm_1.getConnection();
    return connection.getRepository(comment_1.Comment);
}
exports.getCommentRepository = getCommentRepository;
