import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    price: z.number({
      required_error: 'Price is required',
    }),
    information: z.array(
      z.string({
        required_error: 'Information is required',
      }),
      {
        required_error: 'Information are required',
      }
    ),
    image: z.string().optional(),
    availability: z.boolean().optional(),
    categoryId: z.string({
      required_error: 'Category Id is required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    price: z.number().optional(),
    information: z
      .array(
        z.string({
          required_error: 'Information is required',
        })
      )
      .optional(),
    image: z.string().optional(),
    availability: z.boolean().optional(),
    categoryId: z.string().optional(),
  }),
});

export const MakeoverServiceValidation = {
  create,
  update,
};
