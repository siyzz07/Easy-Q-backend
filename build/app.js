"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customerRoutes_1 = __importDefault(require("./routes/customerRoutes"));
const cors_1 = __importDefault(require("cors"));
const vendorRoutes_1 = __importDefault(require("./routes/vendorRoutes"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const adminRoutes_1 = __importDefault(require("./routes/adminRoutes"));
const errorHandler_1 = require("./middlewares/errorHandler");
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const bookingRoute_1 = __importDefault(require("./routes/bookingRoute"));
const morganLogger_1 = require("./middlewares/morganLogger");
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use((0, cookie_parser_1.default)());
console.log(process.env.BASE_URL);
app.use((0, cors_1.default)({
    origin: [process.env.BASE_URL],
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    credentials: true
}));
// app.use(
//   morgan("tiny", {
//     stream: {
//       write: (message) => logger.info(message.trim()),
//     },
//   })
// );
app.use(morganLogger_1.morganLogger);
app.use('/api/customer', customerRoutes_1.default);
app.use('/api/vendor', vendorRoutes_1.default);
app.use('/api/admin', adminRoutes_1.default);
app.use('/api/auth', authRoutes_1.default);
app.use('/api/booking', bookingRoute_1.default);
app.use(errorHandler_1.errorHandler);
exports.default = app;
