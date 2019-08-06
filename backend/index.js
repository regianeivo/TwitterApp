"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
//import express module
var express_1 = __importDefault(require("express"));
//create an express app
var app = express_1.default();
//declare endpoint for http GET
app.get("/", function (req, res) { return res.send("Hello World!"); });
//declare port to be used by the server
var port = 8080;
//start http server in port 8080
app.listen(port, function () { return console.log('Example app listening on the port ${port}!'); });
