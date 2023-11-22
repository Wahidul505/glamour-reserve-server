"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReviewAndRatingValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.string().optional(),
        rating: zod_1.z.number().optional(),
        userId: zod_1.z.string({
            required_error: 'User ID required',
        }),
        makeoverServiceId: zod_1.z.string({
            required_error: 'Service ID required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        review: zod_1.z.string().optional(),
        rating: zod_1.z.number().optional(),
        userId: zod_1.z.string().optional(),
        makeoverServiceId: zod_1.z.string().optional(),
    }),
});
exports.ReviewAndRatingValidation = {
    create,
    update,
};
