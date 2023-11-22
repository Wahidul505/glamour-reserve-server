import { z } from 'zod';

const create = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required',
    }),
    information: z.array(
      z.string({
        required_error: 'Information is required',
      }),
      {
        required_error: 'Information are required',
      }
    ),
  }),
});

const update = z.object({
  body: z.object({
    title: z.string().optional(),
    information: z
      .array(
        z.string({
          required_error: 'Information is required',
        })
      )
      .optional(),
  }),
});

export const CategoryValidation = {
  create,
  update,
};
