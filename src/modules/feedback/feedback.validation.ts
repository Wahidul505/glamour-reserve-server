import { z } from 'zod';

const create = z.object({
  body: z.object({
    comment: z.string({
      required_error: 'Feedback is required',
    }),
    userId: z.string({
      required_error: 'User ID required',
    }),
  }),
});

export const FeedbackValidation = {
  create,
};
