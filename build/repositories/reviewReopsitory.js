"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewRepository = void 0;
const ReviewModel_1 = __importDefault(require("../models/ReviewModel"));
const baseRepository_1 = __importDefault(require("./baseRepository"));
class ReviewRepository extends baseRepository_1.default {
    constructor() {
        super(ReviewModel_1.default);
        this._ReivewModel = ReviewModel_1.default;
    }
    async addReivew(data) {
        const result = await this.create(data);
    }
}
exports.ReviewRepository = ReviewRepository;
