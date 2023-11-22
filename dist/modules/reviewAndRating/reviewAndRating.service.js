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
exports.ReviewAndRatingService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const validateUser_1 = require("../../utils/validateUser");
const insertIntoDB = (payload, user) => __awaiter(void 0, void 0, void 0, function* () {
    (0, validateUser_1.validateUser)(user, payload === null || payload === void 0 ? void 0 : payload.userId);
    const alreadyReviewed = yield prisma_1.default.reviewAndRating.findFirst({
        where: {
            makeoverServiceId: payload === null || payload === void 0 ? void 0 : payload.makeoverServiceId,
            userId: payload === null || payload === void 0 ? void 0 : payload.userId,
        },
    });
    if (alreadyReviewed)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'We already received your review');
    const result = yield prisma_1.default.reviewAndRating.create({
        data: payload,
    });
    return result;
});
const updateData = (payload, id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.reviewAndRating.findUnique({
        where: {
            id,
        },
    });
    if (!isExist)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Not found');
    (0, validateUser_1.validateUser)(user, isExist === null || isExist === void 0 ? void 0 : isExist.userId);
    const result = yield prisma_1.default.reviewAndRating.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteData = (id, user) => __awaiter(void 0, void 0, void 0, function* () {
    const isExist = yield prisma_1.default.reviewAndRating.findUnique({
        where: {
            id,
        },
    });
    if (!isExist)
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Not found');
    (0, validateUser_1.validateUser)(user, isExist === null || isExist === void 0 ? void 0 : isExist.userId);
    yield prisma_1.default.reviewAndRating.delete({
        where: {
            id,
        },
    });
});
const getReviews = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.reviewAndRating.findMany({
        include: {
            user: true,
        },
        take: 10,
    });
    return result;
});
exports.ReviewAndRatingService = {
    insertIntoDB,
    updateData,
    deleteData,
    getReviews,
};
