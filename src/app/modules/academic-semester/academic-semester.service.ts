import ApiError from '../../../errors/ApiError';
import { academicSemesterTitleCoderMapper } from './academc-semester.constant';
import { IAcademicSemester } from './academic-semester.interface';
import { AcademicSemester } from './academic-semester.model';
import httpStatus from 'http-status';

const createAcademicSemester = async (
  payload: IAcademicSemester
): Promise<IAcademicSemester> => {
  if (academicSemesterTitleCoderMapper[payload.title] !== payload.code) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }

  const createdAcademicSemester = await AcademicSemester.create(payload);
  if (!createdAcademicSemester) {
    throw new ApiError(400, 'Failed to create Semester!');
  }
  return createdAcademicSemester;
};

export const AcademicSemesterService = {
  createAcademicSemester,
};
