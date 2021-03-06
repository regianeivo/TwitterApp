"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Middleware function used for JWT token validation
function authMiddleware(req, res, next) {
    // Read token signature from environment variables
    var AUTH_SECRET = process.env.AUTH_SECRET;
    // Read token from request headers
    var token = req.headers["x-auth-token"];
    // Client error if no token found in request headers
    if (typeof token !== "string") {
        res.status(400).send();
    }
    else {
        // Server error is enironment variable is not set
        if (AUTH_SECRET === undefined) {
            throw new Error("Missing environment variable AUTH_SECRET");
        }
        else {
            try {
                // Check that the token is valid
                var obj = jsonwebtoken_1.default.verify(token, AUTH_SECRET);
                // Add the user ID to the HTTP request object
                // so we can access it from the NEXT request handler
                req.userId = obj.id;
                // Invoke NEXT request handler
                next();
            }
            catch (err) {
                // Unauthorized if the token cannot be verified
                console.error(err);
                res.status(500)
                    .json({ error: "Internal server error" })
                    .send();
            }
        }
    }
}
exports.authMiddleware = authMiddleware;
