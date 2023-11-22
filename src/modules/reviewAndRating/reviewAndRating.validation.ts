import { z } from 'zod';

const create = z.object({
  body: z.object({
    review: z.string().optional(),
    rating: z.number().optional(),
    userId: z.string({
      required_error: 'User ID required',
    }),
    makeoverServiceId: z.string({
      required_error: 'Service ID required',
    }),
  }),
});

const update = z.object({
  body: z.object({
    review: z.string().optional(),
    rating: z.number().optional(),
    userId: z.string().optional(),
    makeoverServiceId: z.string().optional(),
  }),
});

export const ReviewAndRatingValidation = {
  create,
  update,
};
