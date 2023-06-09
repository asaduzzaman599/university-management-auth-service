import { z } from 'zod';
export const createUserSchema = z.object({
  body: z.object({
    user: z.object({
      role: z.string({
        required_error: 'Role is required',
      }),
      password: z.string().optional(),
    }),
  }),
});

export const UserValidation = {
  createUserSchema,
};
