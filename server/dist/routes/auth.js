"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authController_1 = __importDefault(require("../controller/authController"));
const express_validator_1 = require("express-validator");
const user_1 = __importDefault(require("../models/user"));
const router = (0, express_1.Router)();
const isValidUser = email => {
    return user_1.default.findOne({ email: email }).then(user => {
        if (user) {
            return Promise.reject('E-mail already in use');
        }
    });
};
const isRegistered = email => {
    return user_1.default.findOne({ email: email }).then(user => {
        if (!user) {
            return Promise.reject('User is not registered');
        }
    });
};
router.post("/signup", [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Please enter a valid email")
        .custom(isValidUser)
        .normalizeEmail(),
    (0, express_validator_1.body)('password')
        .trim()
        .isLength({ min: 6 }),
    (0, express_validator_1.body)("name")
        .trim()
        .not()
        .isEmpty(),
    (0, express_validator_1.body)("surname")
        .trim()
        .not()
        .isEmpty(),
    (0, express_validator_1.body)("adress")
        .trim()
        .not()
        .isEmpty(),
], authController_1.default.signUp);
router.post("/login", [
    (0, express_validator_1.body)("email")
        .isEmail()
        .withMessage("Please enter a valid email")
        .custom(isRegistered)
        .normalizeEmail()
        .isEmpty(),
    (0, express_validator_1.body)('password')
        .trim()
        .isLength({ min: 6 })
        .isEmpty(),
], authController_1.default.login);
exports.default = router;
