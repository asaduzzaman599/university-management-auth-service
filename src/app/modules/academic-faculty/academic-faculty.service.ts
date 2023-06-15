import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  IAcademicFaculty,
  IAcademicFacultyFilter,
} from './academic-faculty.interface';
import { AcademicFaculty } from './academic-faculty.model';
import { PaginationOption } from '../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/common.interface';
import { paginationHelpers } from '../../../helpers/pagination-helpers';
import { SortOrder } from 'mongoose';

const createAcademicFaculty = async (
  payload: IAcademicFaculty
): Promise<IAcademicFaculty> => {
  const createdAcademicFaculty = await AcademicFaculty.create(payload);
  if (!createdAcademicFaculty) {
    throw new ApiError(400, 'Failed to create Faculty!');
  }
  return createdAcademicFaculty;
};

const updateFaculty = async (
  _id: string,
  payload: Partial<IAcademicFaculty>
): Promise<IAcademicFaculty> => {
  if (!_id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Input');
  }
  const result = await AcademicFaculty.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong');
  }
  return result;
};

const deleteFaculty = async (_id: string): Promise<IAcademicFaculty | null> => {
  if (!_id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Input');
  }

  const result = await AcademicFaculty.findOneAndDelete({ _id });

  return result;
};

const getAllFaculty = async (
  paginationOption: PaginationOption,
  filters: IAcademicFacultyFilter
): Promise<IGenericResponse<IAcademicFaculty[]>> => {
  const { search = '', ...filtersData } = filters;

  const andCondition = [];
  const academicFacultySearchAble = ['title'];
  if (search) {
    andCondition.push({
      $or: academicFacultySearchAble.map(field => ({
        [field]: {
          $regex: search,
          $options: 'i',
        },
      })),
    });
  }

  if (Object.keys(filtersData).length) {
    andCondition.push({
      $and: Object.entries(filtersData).map(([field, value]) => ({
        [field]: value,
      })),
    });
  }

  const where = andCondition.length ? { $and: andCondition } : {};

  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.paginationCalculation(paginationOption);

  const sortCondition: Record<string, SortOrder> = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const result = await AcademicFaculty.find(where)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicFaculty.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleFaculty = async (_id: string): Promise<IAcademicFaculty> => {
  const result = await AcademicFaculty.findById(_id);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No faculty found');
  }
  return result;
};

export const AcademicFacultyService = {
  createAcademicFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
