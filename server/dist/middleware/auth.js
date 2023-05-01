"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
// If you're using dotenv for environment variables, load the configuration
dotenv_1.default.config();
const config = process.env;
const verifyToken = (req, res, next) => {
    const token = req.body.token || req.query.token || req.params.token || req.headers["x-access-token"];
    if (!token) {
        return res.status(403).send("A token is required for authentication");
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, config.TOKEN_KEY);
        console.log(`
      decoded: ${decoded}
      `);
        req.user = decoded.user_id;
    }
    catch (err) {
        return res.status(401).send("Invalid Token");
    }
    return next();
};
exports.default = verifyToken;
