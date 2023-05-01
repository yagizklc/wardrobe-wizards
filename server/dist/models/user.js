"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    email: { type: String, required: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    adress: { type: String, required: true },
    password: { type: String, required: true },
});
const User = (0, mongoose_1.model)('User', userSchema);
exports.default = User;
