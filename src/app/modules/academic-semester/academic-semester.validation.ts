import { z } from 'zod';
import { AcademicSemesterConstant } from './academc-semester.constant';
import {
  AcademicSemesterCode,
  AcademicSemesterTitle,
  Month,
} from './academic-semester.interface';

const createAcademicSemesterZodSchema = z.object({
  body: z.object({
    title: z.enum(
      [...AcademicSemesterConstant.academicSemesterTitle] as [
        AcademicSemesterTitle,
        ...AcademicSemesterTitle[]
      ],
      {
        required_error: 'Title is required!',
      }
    ),
    year: z.number({
      required_error: 'year is required!',
    }),
    code: z.enum(
      [...AcademicSemesterConstant.academicSemesterCode] as [
        AcademicSemesterCode,
        ...AcademicSemesterCode[]
      ],
      {
        required_error: 'Code is required!',
      }
    ),
    startMonth: z.enum(
      AcademicSemesterConstant.academicSemesterMonth as [Month, ...Month[]],
      {
        required_error: 'Start month is required!',
      }
    ),
    endMonth: z.enum(
      AcademicSemesterConstant.academicSemesterMonth as [Month, ...Month[]],
      {
        required_error: 'End month is required!',
      }
    ),
  }),
});

export const AcademicSemesterValidation = {
  createAcademicSemesterZodSchema,
};
