"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const resizeImage_1 = __importDefault(require("../../utilities/resizeImage"));
const students = express_1.default.Router();
students.get('/', resizeImage_1.default, () => {
    //
});
exports.default = students;
