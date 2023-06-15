import { Model, Types, model } from 'mongoose';
import { IAcademicFaculty } from '../academic-faculty/academic-faculty.interface';

export type IAcademicDepartment = {
  title: string;
  academicFaculty: {
    _id: Types.ObjectId;
    info?: Types.ObjectId | IAcademicFaculty;
  };
};

export type AcademicDepartmentModel = Model<
  IAcademicDepartment,
  Record<string, unknown>
>;

export type IAcademicDepartmentFilter = {
  search?: string;
};
