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
const sharpResize_1 = require("../utilities/sharpResize");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
describe("check resize done successfully and resized file exists", () => {
    it("check file resized and exist in thumb folder", () => __awaiter(void 0, void 0, void 0, function* () {
        const imagePath = path_1.default.resolve('./assets/full');
        const thumbnailPath = path_1.default.resolve('./assets/thumb');
        const resizedImage = thumbnailPath + `/encenadaport-100-100.jpg`;
        yield (0, sharpResize_1.shrapResizeImage)(imagePath, "encenadaport", 100, 100, thumbnailPath);
        // check file exist 
        expect(fs_1.default.existsSync(resizedImage)).toBe(true);
    }));
});
// test /api endpoint response status
const request = (0, supertest_1.default)(index_1.default);
describe('Test /api endpoint responses ', () => {
    it('gets the api endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api');
        expect(response.status).toBe(200);
    }));
});
// test /api/images endpoint response status
describe('Test /api/images endpoint responses to be 200', () => {
    it('images endpoint successfully return 200 status code ', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield request.get('/api/images?filename=santamonica&width=100&height=100');
        expect(response.status).toBe(200);
    }));
});
