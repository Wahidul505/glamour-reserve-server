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
exports.BookingUtils = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../errors/ApiError"));
const prisma_1 = __importDefault(require("../../shared/prisma"));
const checkSlotAvailability = (payload, updateId = null) => __awaiter(void 0, void 0, void 0, function* () {
    const alreadyBookedSlotOnDay = yield prisma_1.default.booking.findMany({
        where: {
            date: payload === null || payload === void 0 ? void 0 : payload.date,
        },
    });
    const existingSlots = alreadyBookedSlotOnDay.map(slot => ({
        startTime: slot.startTime,
        endTime: slot.endTime,
        date: slot.date,
        id: slot.id,
    }));
    const newSlot = {
        startTime: payload === null || payload === void 0 ? void 0 : payload.startTime,
        endTime: payload === null || payload === void 0 ? void 0 : payload.endTime,
        date: payload === null || payload === void 0 ? void 0 : payload.date,
    };
    for (const slot of existingSlots) {
        const existingStart = new Date(`${slot.date}T${slot.startTime}:00`);
        const existingEnd = new Date(`${slot.date}T${slot.endTime}:00`);
        const newStart = new Date(`${newSlot.date}T${newSlot.startTime}:00`);
        const newEnd = new Date(`${newSlot.date}T${newSlot.endTime}:00`);
        if (newStart < existingEnd && newEnd > existingStart) {
            console.log('updateId', updateId);
            console.log('slotId', slot.id);
            if (updateId && slot.id === updateId)
                return;
            throw new ApiError_1.default(http_status_1.default.CONFLICT, 'Slot already booked, Please try to book in another available slot');
        }
    }
});
exports.BookingUtils = {
    checkSlotAvailability,
};
