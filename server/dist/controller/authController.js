"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("../models/user"));
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//@desc Signup for customer
//@route POST /signup
//@access public
const signUp = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
    const newUser = new user_1.default({
        email: req.body.email,
        name: req.body.name,
        surname: req.body.surname,
        adress: req.body.adress,
        password: hashedPassword
    });
    const addedUser = yield newUser.save();
    res.status(200).json({ status: "success", userInfo: addedUser });
});
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
        // Get user input
        const { email, password } = req.body;
        // Validate if user exist in our database
        const user = yield user_1.default.findOne({ email });
        const comp = yield bcrypt_1.default.compare(password, user.password);
        const hashedpw = yield bcrypt_1.default.hash(password, 10);
        console.log(`
          sentPassword: ${password}
          hashedpw: ${hashedpw}
          encryptedPassword: ${user.password}
          comp: ${comp}
          `);
        if (user && (yield bcrypt_1.default.compare(password, user.password))) {
            // Create token
            const token = jsonwebtoken_1.default.sign({ user_id: user._id, email }, process.env.TOKEN_KEY, { expiresIn: "2h" });
            console.log(" token: " + token + "");
            // user
            return res.status(200).json({ token: token });
        }
        return res.status(400).send("Invalid Credentials");
    }
    catch (err) {
        console.log(err);
    }
});
exports.default = { signUp, login };
