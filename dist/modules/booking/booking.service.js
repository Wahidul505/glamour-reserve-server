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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingService = void 0;
const client_1 = require("@prisma/client");
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const paginationHelper_1 = require("../../helpers/paginationHelper");
const prisma_1 = __importDefault(require("../../shared/prisma"));
const booking_constants_1 = require("./booking.constants");
const booking_utils_1 = require("./booking.utils");
const insertIntoDB = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield booking_utils_1.BookingUtils.checkSlotAvailability(payload);
    const result = yield prisma_1.default.booking.create({
        data: payload,
    });
    return result;
});
const getAllFromDB = (filters, options) => __awaiter(void 0, void 0, void 0, function* () {
    const { page, size } = paginationHelper_1.paginationHelpers.calculatePagination(options);
    const { search } = filters, filtersData = __rest(filters, ["search"]);
    const andConditions = [];
    if (search) {
        andConditions.push({
            OR: booking_constants_1.bookingSearchableFields.map((field) => ({
                [field]: {
                    contains: search,
                    mode: 'insensitive',
                },
            })),
        });
    }
    if (Object.keys(filtersData).length > 0) {
        andConditions.push({
            AND: Object.keys(filtersData).map(key => ({
                [key]: {
                    equals: filtersData[key],
                    mode: 'insensitive',
                },
            })),
        });
    }
    const whereConditions = andConditions.length > 0 ? { AND: andConditions } : { AND: {} };
    const result = yield prisma_1.default.booking.findMany({
        where: whereConditions,
        orderBy: options.sortBy && options.sortOrder
            ? {
                [options.sortBy]: options.sortOrder,
            }
            : {
                createdAt: 'desc',
            },
        include: {
            makeoverService: {
                include: {
                    category: true,
                },
            },
            user: true,
        },
    });
    const total = yield prisma_1.default.booking.count({
        where: whereConditions,
    });
    const totalPage = Math.ceil(total / size);
    return {
        meta: {
            page,
            size,
            total,
            totalPage,
        },
        data: result,
    };
});
const getDataById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findUnique({
        where: {
            id,
        },
    });
    return result;
});
const updateData = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    yield booking_utils_1.BookingUtils.checkSlotAvailability(payload, id);
    const result = yield prisma_1.default.booking.update({
        where: {
            id,
        },
        data: payload,
    });
    return result;
});
const deleteData = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.delete({
        where: {
            id,
        },
    });
    return result;
});
const updateBookingStatus = (id, status) => __awaiter(void 0, void 0, void 0, function* () {
    yield prisma_1.default.booking.update({
        where: {
            id,
        },
        data: {
            status,
        },
    });
});
const getMyBookings = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findMany({
        where: {
            userId,
        },
        include: {
            makeoverService: {
                include: {
                    category: true,
                },
            },
            user: true,
        },
    });
    return result;
});
const getMyBookingById = (userId, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findUnique({
        where: {
            id: bookingId,
            userId,
        },
        include: {
            makeoverService: {
                include: {
                    category: true,
                },
            },
            user: true,
        },
    });
    return result;
});
const deleteMyBooking = (userId, bookingId) => __awaiter(void 0, void 0, void 0, function* () {
    const exist = yield prisma_1.default.booking.findUnique({
        where: {
            id: bookingId,
            userId,
        },
    });
    if (exist && exist.status === client_1.BookingStatus.confirmed) {
        throw new ApiError_1.default(http_status_1.default.NOT_ACCEPTABLE, "Your booking is confirmed. You can't cancel the booking");
    }
    yield prisma_1.default.booking.delete({
        where: {
            id: bookingId,
            userId,
        },
    });
});
const getBookingsByDate = (date) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield prisma_1.default.booking.findMany({
        where: {
            date: date,
        },
        select: {
            startTime: true,
            endTime: true,
        },
    });
    return result;
});
exports.BookingService = {
    insertIntoDB,
    getAllFromDB,
    getDataById,
    updateData,
    deleteData,
    updateBookingStatus,
    getMyBookings,
    getMyBookingById,
    deleteMyBooking,
    getBookingsByDate,
};
