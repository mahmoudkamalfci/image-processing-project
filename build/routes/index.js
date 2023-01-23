"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const students_1 = __importDefault(require("./api/students"));
const routes = express_1.default.Router();
routes.get('/', (req, res) => {
    res.send('Hello, world! fromf router ');
});
routes.use('/images', students_1.default);
exports.default = routes;
