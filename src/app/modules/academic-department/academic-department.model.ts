import { Schema, model } from 'mongoose';
import {
  AcademicDepartmentModel,
  IAcademicDepartment,
} from './academic-department.interface';
import ApiError from '../../../errors/ApiError';
import httpStatus from 'http-status';

const academicDepartmentSchema = new Schema<IAcademicDepartment>(
  {
    title: {
      type: String,
      required: true,
      unique: true,
    },
    academicFaculty: {
      _id: {
        type: Schema.Types.ObjectId,
        required: true,
      },
      info: {
        type: Schema.Types.ObjectId,
        ref: 'AcademicFaculty',
      },
    },
  },
  {
    timestamps: true,
    toJSON: {
      virtuals: true,
    },
  }
);

academicDepartmentSchema.pre('save', async function (next) {
  const isExists = await AcademicDepartment.findOne({
    title: this.title,
  });
  if (isExists)
    throw new ApiError(
      httpStatus.CONFLICT,
      'Duplicate academic department already exists using same title and year'
    );

  this.academicFaculty.info = this.academicFaculty._id;

  next();
});

export const AcademicDepartment = model<
  IAcademicDepartment,
  AcademicDepartmentModel
>('AcademicDepartment', academicDepartmentSchema);
