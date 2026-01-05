"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRepository = void 0;
const notificationModel_1 = __importDefault(require("../models/notificationModel"));
const baseRepository_1 = __importDefault(require("./baseRepository"));
class NotificationRepository extends baseRepository_1.default {
    constructor() {
        super(notificationModel_1.default);
        this._NotificationModel = notificationModel_1.default;
    }
    async addNewNotification(data) {
        const result = await this.create(data);
        return !!result;
    }
}
exports.NotificationRepository = NotificationRepository;
