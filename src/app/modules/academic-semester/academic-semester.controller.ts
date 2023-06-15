import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catch-async';
import sendResponse from '../../../shared/send-response';
import { AcademicSemesterService } from './academic-semester.service';
import { PaginationOption } from '../../interfaces/pagination';
import pick from '../../../shared/pick';
import { paginationFields } from '../../constants.ts/pagination';
import { IAcademicSemester } from './academic-semester.interface';
import { academicSemesterFilterFields } from './academc-semester.constant';

const createSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const academicSemester = req.body;

    const result = await AcademicSemesterService.createAcademicSemester(
      academicSemester
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Semester created Successfully!',
    });
    next();
  }
);
const getAllSemester: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions: PaginationOption = pick(
      req.query,
      paginationFields
    );

    const filters = pick(req.query, academicSemesterFilterFields);

    const result = await AcademicSemesterService.getAllSemester(
      paginationOptions,
      filters
    );

    sendResponse<IAcademicSemester[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleSemester: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AcademicSemesterService.getSingleSemester(id);

  return sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const updateSemester: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const result = await AcademicSemesterService.updateSemester(id, updateData);

  return sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Updated Successfully!',
    data: result,
  });
});

const deleteSemester: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AcademicSemesterService.deleteSemester(id);

  return sendResponse<IAcademicSemester>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Semester Deleted Successfully!',
  });
});

export const AcademicSemesterController = {
  createSemester,
  getAllSemester,
  getSingleSemester,
  updateSemester,
  deleteSemester,
};
