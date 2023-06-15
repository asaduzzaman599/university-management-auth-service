import { Schema, model } from 'mongoose';
import {
  AcademicFacultyModel,
  IAcademicFaculty,
} from './academic-faculty.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const academicFacultySchema = new Schema<IAcademicFaculty>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

academicFacultySchema.pre('save', async function (next) {
  const isExists = await AcademicFaculty.findOne({
    title: this.title,
  });
  if (isExists)
    throw new ApiError(
      httpStatus.CONFLICT,
      'Duplicate academic faculty already exists using same title and year'
    );

  next();
});

export const AcademicFaculty = model<IAcademicFaculty, AcademicFacultyModel>(
  'AcademicFaculty',
  academicFacultySchema
);
