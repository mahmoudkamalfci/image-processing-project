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
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const sharpResize_1 = require("./sharpResize");
const resizeImage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const width = Number(req.query.width);
    const height = Number(req.query.height);
    const imageName = req.query.filename;
    const imagePath = path_1.default.resolve('./assets/full');
    const thumbnailPath = path_1.default.resolve('./assets/thumb');
    const resizedImage = thumbnailPath + `/${imageName}-${width}-${height}.jpg`;
    // check image, width and height are in a valid formate
    // check image exist or make resize (cache)
    if (!imageName) {
        console.log('Image name is required');
        res.send('Image name is required');
    }
    else if (isNaN(width) || !width) {
        console.log('Please enter a valid number for width and should be > 0');
        res.send('Please enter a valid number for width and should be > 0');
    }
    else if (isNaN(height) || !height) {
        console.log('Please enter a valid number for height and should be > 0');
        res.send('Please enter a valid number for height and should be > 0');
    }
    // check cached image exist or not
    else if (fs_1.default.existsSync(resizedImage)) {
        console.log('this file is already exist use the cached version');
        res.sendFile(resizedImage);
    }
    else {
        yield (0, sharpResize_1.shrapResizeImage)(imagePath, imageName, width, height, thumbnailPath);
        res.sendFile(resizedImage);
    }
    next();
});
exports.default = resizeImage;
