import { Schema, model } from 'mongoose';
import { AcademicSemesterConstant } from './academc-semester.constant';
import {
  AcademicSemesterModel,
  IAcademicSemester,
} from './academic-semester.interface';
import ApiError from '../../../errors/ApiError';
import status from 'http-status';

const academicSemesterSchema = new Schema<IAcademicSemester>(
  {
    title: {
      type: String,
      required: true,
      enum: AcademicSemesterConstant.academicSemesterTitle,
    },
    year: {
      type: Number,
      required: true,
    },
    code: {
      type: String,
      required: true,
      enum: AcademicSemesterConstant.academicSemesterCode,
    },
    startMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterConstant.academicSemesterMonth,
    },
    endMonth: {
      type: String,
      required: true,
      enum: AcademicSemesterConstant.academicSemesterMonth,
    },
  },
  {
    timestamps: true,
  }
);

academicSemesterSchema.pre('save', async function (next) {
  const isExists = await AcademicSemester.findOne({
    year: this.year,
    title: this.title,
  });
  if (isExists)
    throw new ApiError(
      status.CONFLICT,
      'Duplicate semester already exists using same title and year'
    );

  next();
});

export const AcademicSemester = model<IAcademicSemester, AcademicSemesterModel>(
  'AcademicSemester',
  academicSemesterSchema
);
