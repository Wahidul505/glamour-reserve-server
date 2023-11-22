"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAdmin = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../errors/ApiError"));
const validateAdmin = (jwtUser, fetchedUser) => {
    if ((jwtUser === null || jwtUser === void 0 ? void 0 : jwtUser.role) === client_1.UserRole.admin) {
        if ((fetchedUser === null || fetchedUser === void 0 ? void 0 : fetchedUser.role) !== client_1.UserRole.client) {
            throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'You are not authorized');
        }
    }
};
exports.validateAdmin = validateAdmin;
