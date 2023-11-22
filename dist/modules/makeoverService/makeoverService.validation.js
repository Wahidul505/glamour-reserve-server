"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MakeoverServiceValidation = void 0;
const zod_1 = require("zod");
const create = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string({
            required_error: 'Title is required',
        }),
        price: zod_1.z.number({
            required_error: 'Price is required',
        }),
        information: zod_1.z.array(zod_1.z.string({
            required_error: 'Information is required',
        }), {
            required_error: 'Information are required',
        }),
        image: zod_1.z.string().optional(),
        availability: zod_1.z.boolean().optional(),
        categoryId: zod_1.z.string({
            required_error: 'Category Id is required',
        }),
    }),
});
const update = zod_1.z.object({
    body: zod_1.z.object({
        title: zod_1.z.string().optional(),
        price: zod_1.z.number().optional(),
        information: zod_1.z
            .array(zod_1.z.string({
            required_error: 'Information is required',
        }))
            .optional(),
        image: zod_1.z.string().optional(),
        availability: zod_1.z.boolean().optional(),
        categoryId: zod_1.z.string().optional(),
    }),
});
exports.MakeoverServiceValidation = {
    create,
    update,
};
