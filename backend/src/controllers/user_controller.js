"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = __importStar(require("express"));
var user_repository_1 = require("../repositories/user_repository");
var auth_1 = require("../config/auth");
var joi = __importStar(require("joi"));
exports.UserIdSchema = {
    id: joi.number()
};
exports.userDetailsSchema = {
    email: joi.string().email(),
    password: joi.string()
};
// We pass the repository instance as an argument
// We use this pattern so we can unit test the handlers with ease
function getHandlers(userRepository) {
    var _this = this;
    // Creates a new user
    var createUser = function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var newUser, result, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        newUser = req.body;
                        result = joi.validate(newUser, exports.userDetailsSchema);
                        if (!result.error) return [3 /*break*/, 1];
                        res.json({ msg: "Invalid user details in body!" }).status(400).send();
                        return [3 /*break*/, 3];
                    case 1: 
                    // Save the user into the database
                    return [4 /*yield*/, userRepository.save(newUser)];
                    case 2:
                        // Save the user into the database
                        _a.sent();
                        res.json({ ok: "ok" }).send();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_1 = _a.sent();
                        // Handle unexpected errors
                        console.error(err_1);
                        res.status(500)
                            .json({ error: "Internal server error" })
                            .send();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); })();
    };
    // Get one user by its ID
    var getUserById = function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var idStr, userId, result, user, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        idStr = req.params.id;
                        userId = { id: parseInt(idStr) };
                        result = joi.validate(userId, exports.UserIdSchema);
                        if (!result.error) return [3 /*break*/, 1];
                        res.status(400)
                            .json({ msg: "Invalid parameter id '" + userId.id + "' in URL" })
                            .send();
                        return [3 /*break*/, 3];
                    case 1: return [4 /*yield*/, userRepository.createQueryBuilder("user")
                            .leftJoinAndSelect("user.comments", "comment")
                            .leftJoinAndSelect("user.tweets", "tweet")
                            .leftJoinAndSelect("user.likes", "like")
                            .where("user.id = :id", { id: userId.id })
                            .getOne()];
                    case 2:
                        user = _a.sent();
                        // Return error HTTP 404 not found if not found
                        if (user === undefined) {
                            res.status(404)
                                .json({ msg: "User with id '" + userId.id + "' not found!" })
                                .send();
                        }
                        else {
                            // Return the user
                            res.json(user).send();
                        }
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_2 = _a.sent();
                        // Handle unexpected errors
                        console.error(err_2);
                        res.status(500)
                            .json({ error: "Internal server error" })
                            .send();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); })();
    };
    return {
        createUser: createUser,
        getUserById: getUserById
    };
}
exports.getHandlers = getHandlers;
function getUserController() {
    var repository = user_repository_1.getUserRepository();
    var handlers = getHandlers(repository);
    var router = express.Router();
    // Public
    router.post("/", handlers.createUser);
    // Private
    router.get("/:id", auth_1.authMiddleware, handlers.getUserById);
    return router;
}
exports.getUserController = getUserController;
