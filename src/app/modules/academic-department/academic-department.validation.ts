import { z } from 'zod';

const createAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z.string({
      required_error: 'Title is required!',
    }),
    academicFaculty: z.object({
      _id: z.string({
        required_error: 'Academic Faculty is required!',
      }),
    }),
  }),
});

const updateAcademicDepartmentZodSchema = z.object({
  body: z.object({
    title: z
      .string({
        required_error: 'Title is required!',
      })
      .optional(),
    academicFaculty: z
      .object({
        _id: z.string(),
      })
      .optional(),
  }),
});

export const AcademicDepartmentValidation = {
  createAcademicDepartmentZodSchema,
  updateAcademicDepartmentZodSchema,
};
