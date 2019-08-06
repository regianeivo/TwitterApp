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
var tweet_repository_1 = require("../repositories/tweet_repository");
var tweet_1 = require("../entities/tweet");
var auth_1 = require("../config/auth");
var joi = __importStar(require("joi"));
var like_repository_1 = require("../repositories/like_repository");
var like_1 = require("../entities/like");
exports.tweetIdSchema = {
    id: joi.number()
};
exports.tweetSchema = {
    content: joi.string(),
    date: joi.string()
};
// We pass the repository instance as an argument
// We use this pattern so we can unit test the handlers with ease
function getHandlers(tweetRepository, likeRepository) {
    var _this = this;
    var getAllTweets = function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var tweets, err_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        return [4 /*yield*/, tweetRepository.find()];
                    case 1:
                        tweets = _a.sent();
                        res.json(tweets).send();
                        return [3 /*break*/, 3];
                    case 2:
                        err_1 = _a.sent();
                        // Handle unexpected errors
                        console.error(err_1);
                        res.status(500)
                            .json({ error: "Internal server error" })
                            .send();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); })();
    };
    var getTweetById = function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var idStr, tweetId, idValidationresult, link, err_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 2, , 3]);
                        idStr = req.params.id;
                        tweetId = { id: parseInt(idStr) };
                        idValidationresult = joi.validate(tweetId, exports.tweetIdSchema);
                        if (idValidationresult.error) {
                            res.status(400).json({ error: "Bad request" }).send();
                        }
                        return [4 /*yield*/, tweetRepository.createQueryBuilder("tweet")
                                .leftJoinAndSelect("tweet.comments", "comment")
                                .leftJoinAndSelect("tweet.user", "user")
                                .leftJoinAndSelect("tweet.votes", "like")
                                .where("tweet.id = :id", { id: tweetId.id })
                                .getOne()];
                    case 1:
                        link = _a.sent();
                        if (tweetId === undefined) {
                            res.status(404)
                                .json({ error: "Not found" })
                                .send();
                        }
                        else {
                            res.json(tweetId).send();
                        }
                        return [3 /*break*/, 3];
                    case 2:
                        err_2 = _a.sent();
                        // Handle unexpected errors
                        console.error(err_2);
                        res.status(500)
                            .json({ error: "Internal server error" })
                            .send();
                        return [3 /*break*/, 3];
                    case 3: return [2 /*return*/];
                }
            });
        }); })();
    };
    var createTweet = function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var newTweet, result, tweetToBeSaved, savedTweet, err_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        // The request userId property is set by the authMiddleware
                        // if it is undefined it means that we forgot the authMiddleware
                        if (req.userId === undefined) {
                            throw new Error("The request is not authenticated! Please ensure that authMiddleware is used");
                        }
                        newTweet = req.body;
                        result = joi.validate(newTweet, exports.tweetSchema);
                        if (!result.error) return [3 /*break*/, 1];
                        res.json({ msg: "Invalid user details in body!" }).status(400).send();
                        return [3 /*break*/, 3];
                    case 1:
                        tweetToBeSaved = new tweet_1.Tweet();
                        tweetToBeSaved.userId = req.userId;
                        tweetToBeSaved.content = newTweet.content;
                        tweetToBeSaved.date = newTweet.date;
                        return [4 /*yield*/, tweetRepository.save(tweetToBeSaved)];
                    case 2:
                        savedTweet = _a.sent();
                        res.json(savedTweet).send();
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        err_3 = _a.sent();
                        // Handle unexpected errors
                        console.error(err_3);
                        res.status(500)
                            .json({ error: "Internal server error" })
                            .send();
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); })();
    };
    var deleteTweetById = function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var idStr, tweetId, idValidationresult, tweet, err_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 6, , 7]);
                        // The request userId property is set by the authMiddleware
                        // if it is undefined it means that we forgot the authMiddleware
                        if (req.userId === undefined) {
                            throw new Error("The request is not authenticated! Please ensure that authMiddleware is used");
                        }
                        idStr = req.params.id;
                        tweetId = { id: parseInt(idStr) };
                        idValidationresult = joi.validate(tweetId, exports.tweetIdSchema);
                        if (!idValidationresult.error) return [3 /*break*/, 1];
                        res.status(400).json({ error: "Bad request" }).send();
                        return [3 /*break*/, 5];
                    case 1: return [4 /*yield*/, tweetRepository.findOne(tweetId.id)];
                    case 2:
                        tweet = _a.sent();
                        if (!(tweet === undefined)) return [3 /*break*/, 3];
                        res.status(404)
                            .json({ error: "Not found" })
                            .send();
                        return [3 /*break*/, 5];
                    case 3: 
                    // If lik was found, remove it from DB
                    return [4 /*yield*/, tweetRepository.remove(tweet)];
                    case 4:
                        // If lik was found, remove it from DB
                        _a.sent();
                        res.json({ msg: "OK" }).send();
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        err_4 = _a.sent();
                        // Handle unexpected errors
                        console.error(err_4);
                        res.status(500)
                            .json({ error: "Internal server error" })
                            .send();
                        return [3 /*break*/, 7];
                    case 7: return [2 /*return*/];
                }
            });
        }); })();
    };
    var uplikeTweet = function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var idStr, tweetId, idValidationresult, like, likeToBeSaved, err_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        // The request userId property is set by the authMiddleware
                        // if it is undefined it means that we forgot the authMiddleware
                        if (req.userId === undefined) {
                            throw new Error("The request is not authenticated! Please ensure that authMiddleware is used");
                        }
                        idStr = req.params.id;
                        tweetId = { id: parseInt(idStr) };
                        idValidationresult = joi.validate(tweetId, exports.tweetIdSchema);
                        if (!idValidationresult.error) return [3 /*break*/, 1];
                        res.status(400).json({ error: "Bad request" }).send();
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, likeRepository.findOne({
                            where: {
                                tweetId: tweetId.id,
                                userId: req.userId
                            }
                        })];
                    case 2:
                        like = _a.sent();
                        if (!(like !== undefined && like.isPositive === false)) return [3 /*break*/, 4];
                        // If the like was negative we remove it
                        return [4 /*yield*/, likeRepository.remove(like)];
                    case 3:
                        // If the like was negative we remove it
                        _a.sent();
                        res.status(200).json({ ok: "ok" }).send();
                        return [3 /*break*/, 7];
                    case 4:
                        if (!(like !== undefined && like.isPositive === true)) return [3 /*break*/, 5];
                        // if the like was positive we cannot vote again
                        res.status(403).json({ error: "Forbidden" }).send();
                        return [3 /*break*/, 7];
                    case 5:
                        likeToBeSaved = new like_1.Like();
                        likeToBeSaved.isPositive = true;
                        likeToBeSaved.tweetId = tweetId.id;
                        likeToBeSaved.userId = req.userId;
                        return [4 /*yield*/, likeRepository.save(likeToBeSaved)];
                    case 6:
                        _a.sent();
                        res.status(200).json({ ok: "ok" }).send();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        err_5 = _a.sent();
                        // Handle unexpected errors
                        console.error(err_5);
                        res.status(500)
                            .json({ error: "Internal server error" })
                            .send();
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); })();
    };
    var downlikeTweet = function (req, res) {
        (function () { return __awaiter(_this, void 0, void 0, function () {
            var idStr, tweetId, idValidationresult, like, likeToBeSaved, err_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        // The request userId property is set by the authMiddleware
                        // if it is undefined it means that we forgot the authMiddleware
                        if (req.userId === undefined) {
                            throw new Error("The request is not authenticated! Please ensure that authMiddleware is used");
                        }
                        idStr = req.params.id;
                        tweetId = { id: parseInt(idStr) };
                        idValidationresult = joi.validate(tweetId, exports.tweetIdSchema);
                        if (!idValidationresult.error) return [3 /*break*/, 1];
                        res.status(400).json({ error: "Bad request" }).send();
                        return [3 /*break*/, 7];
                    case 1: return [4 /*yield*/, likeRepository.findOne({
                            where: {
                                linkId: tweetId.id,
                                userId: req.userId
                            }
                        })];
                    case 2:
                        like = _a.sent();
                        if (!(like !== undefined && like.isPositive === true)) return [3 /*break*/, 4];
                        // If the like was positive we remove it
                        return [4 /*yield*/, likeRepository.remove(like)];
                    case 3:
                        // If the like was positive we remove it
                        _a.sent();
                        res.status(200).json({ ok: "ok" }).send();
                        return [3 /*break*/, 7];
                    case 4:
                        if (!(like !== undefined && like.isPositive === false)) return [3 /*break*/, 5];
                        // if the like was negative we cannot vote again
                        res.status(403).json({ error: "Forbidden" }).send();
                        return [3 /*break*/, 7];
                    case 5:
                        likeToBeSaved = new like_1.Like();
                        likeToBeSaved.isPositive = false;
                        likeToBeSaved.tweetId = tweetId.id;
                        likeToBeSaved.userId = req.userId;
                        return [4 /*yield*/, likeRepository.save(likeToBeSaved)];
                    case 6:
                        _a.sent();
                        res.status(200).json({ ok: "ok" }).send();
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        err_6 = _a.sent();
                        // Handle unexpected errors
                        console.error(err_6);
                        res.status(500)
                            .json({ error: "Internal server error" })
                            .send();
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); })();
    };
    return {
        getAllTweets: getAllTweets,
        getTweetById: getTweetById,
        createTweet: createTweet,
        deleteTweetById: deleteTweetById,
        uplikeTweet: uplikeTweet,
        downlikeTweet: downlikeTweet
    };
}
exports.getHandlers = getHandlers;
function getTweetsController() {
    var tweetRepository = tweet_repository_1.getTweetRepository();
    var likeRepository = like_repository_1.getLikeRepository();
    var handlers = getHandlers(tweetRepository, likeRepository);
    var router = express.Router();
    // Public
    router.get("/", handlers.getAllTweets);
    router.get("/:id", handlers.getTweetById);
    // Private
    router.post("/", auth_1.authMiddleware, handlers.createTweet);
    router.delete("/:id", auth_1.authMiddleware, handlers.deleteTweetById);
    router.post("/:id/uplike", auth_1.authMiddleware, handlers.uplikeTweet);
    router.post("/:id/downlike", auth_1.authMiddleware, handlers.downlikeTweet);
    return router;
}
exports.getTweetsController = getTweetsController;
