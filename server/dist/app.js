"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_1 = __importDefault(require("./routes/auth"));
const dotenv_1 = __importDefault(require("dotenv"));
const dbConnection_1 = __importDefault(require("./config/dbConnection"));
dotenv_1.default.config();
console.log("Hello World132");
(0, dbConnection_1.default)();
console.log("Hello World12");
const app = (0, express_1.default)();
console.log("Hello World13");
const port = process.env.PORT || 5000;
app.use(express_1.default.json());
console.log("Hello World1");
app.use(auth_1.default);
console.log("Hello World2");
console.log("Hello World3");
app.listen(port, () => {
    console.log(`Server running on port localhost:${port}`);
});
