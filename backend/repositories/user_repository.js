"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var typeorm_1 = require("typeorm");
var user_1 = require("../entities/user");
function getUserRepository() {
    var connection = typeorm_1.getConnection();
    return connection.getRepository(user_1.User);
}
exports.getUserRepository = getUserRepository;
