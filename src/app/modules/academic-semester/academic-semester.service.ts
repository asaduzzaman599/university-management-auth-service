import httpStatus from 'http-status';
import { SortOrder } from 'mongoose';
import ApiError from '../../../errors/ApiError';
import { paginationHelpers } from '../../../helpers/pagination-helpers';
import { IGenericResponse } from '../../interfaces/common.interface';
import { PaginationOption } from '../../interfaces/pagination';
import { academicSemesterTitleCoderMapper } from './academc-semester.constant';
import {
  IAcademicSemester,
  IAcademicSemesterFilter,
} from './academic-semester.interface';
import { AcademicSemester } from './academic-semester.model';

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

const updateSemester = async (
  _id: string,
  payload: Partial<IAcademicSemester>
): Promise<IAcademicSemester> => {
  if (!_id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Input');
  }
  if (
    payload.title &&
    payload.code &&
    academicSemesterTitleCoderMapper[payload.title] !== payload.code
  ) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Semester Code');
  }
  const result = await AcademicSemester.findOneAndUpdate({ _id }, payload, {
    new: true,
  });
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Something went wrong');
  }
  return result;
};

const deleteSemester = async (
  _id: string
): Promise<IAcademicSemester | null> => {
  if (!_id) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Invalid Input');
  }

  const result = await AcademicSemester.findOneAndDelete({ _id });

  return result;
};

const getAllSemester = async (
  paginationOption: PaginationOption,
  filters: IAcademicSemesterFilter
): Promise<IGenericResponse<IAcademicSemester[]>> => {
  const { search = '', ...filtersData } = filters;

  const andCondition = [];
  const academicSemesterSearchAble = ['title', 'code'];
  if (search) {
    andCondition.push({
      $or: academicSemesterSearchAble.map(field => ({
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

  /* const andConditions = [
    {
      $or: [
        {
          title: {
            $regex: search,
            $options: 'i',
          },
        },
        {
          code: {
            $regex: search,
            $options: 'i',
          },
        },
        !isNaN(parseInt(search))
          ? {
              year: {
                $eq: parseInt(search),
              },
            }
          : {},
      ],
    },
  ]; */
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.paginationCalculation(paginationOption);

  const sortCondition: Record<string, SortOrder> = {};

  if (sortBy && sortOrder) {
    sortCondition[sortBy] = sortOrder;
  }
  const result = await AcademicSemester.find(where)
    .sort(sortCondition)
    .skip(skip)
    .limit(limit);

  const total = await AcademicSemester.countDocuments();

  return {
    meta: {
      page,
      limit,
      total,
    },
    data: result,
  };
};

const getSingleSemester = async (_id: string): Promise<IAcademicSemester> => {
  const result = await AcademicSemester.findById(_id);
  if (!result) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'No Semester found');
  }
  return result;
};

export const AcademicSemesterService = {
  createAcademicSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
