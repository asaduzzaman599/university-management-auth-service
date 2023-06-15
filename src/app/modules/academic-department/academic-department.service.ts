import httpStatus from 'http-status';
import ApiError from '../../../errors/ApiError';
import {
  IAcademicDepartment,
  IAcademicDepartmentFilter,
} from './academic-department.interface';
import { AcademicDepartment } from './academic-department.model';
import { PaginationOption } from '../../interfaces/pagination';
import { IGenericResponse } from '../../interfaces/common.interface';
import { paginationHelpers } from '../../../helpers/pagination-helpers';
import { SortOrder } from 'mongoose';

const createAcademicDepartment = async (
  payload: IAcademicDepartment
): Promise<IAcademicDepartment> => {
  const createdAcademicDepartment = (
    await AcademicDepartment.create(payload)
  ).populate('academicFaculty.info');
  if (!createdAcademicDepartment) {
    throw new ApiError(400, 'Failed to create Department!');
  }
  return createdAcademicDepartment;
};

const updateDepartment = async (
  _id: string,
  payload: Partial<IAcademicDepartment>
): Promise<IAcademicDepartment> => {
  if (!_id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Input');
  }
  const result = await AcademicDepartment.findOneAndUpdate({ _id }, payload, {
    new: true,
  }).populate('academicFaculty.info');
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong');
  }
  return result;
};

const deleteDepartment = async (
  _id: string
): Promise<IAcademicDepartment | null> => {
  if (!_id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Input');
  }

  const result = await AcademicDepartment.findOneAndDelete({ _id });

  return result;
};

const getAllDepartment = async (
  paginationOption: PaginationOption,
  filters: IAcademicDepartmentFilter
): Promise<IGenericResponse<IAcademicDepartment[]>> => {
  const { search = '', ...filtersData } = filters;

  const andCondition = [];
  const academicDepartmentSearchAble = ['title'];
  if (search) {
    andCondition.push({
      $or: academicDepartmentSearchAble.map(field => ({
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
  const result = await AcademicDepartment.find(where)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit)
    .populate('academicFaculty.info');

  const total = await AcademicDepartment.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleDepartment = async (
  _id: string
): Promise<IAcademicDepartment> => {
  const result = await AcademicDepartment.findById(_id).populate(
    'academicFaculty.info'
  );
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No department found');
  }
  return result;
};

export const AcademicDepartmentService = {
  createAcademicDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
