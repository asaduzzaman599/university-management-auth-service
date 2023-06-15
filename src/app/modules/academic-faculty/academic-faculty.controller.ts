import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catch-async';
import { PaginationOption } from '../../interfaces/pagination';
import pick from '../../../shared/pick';
import { paginationFields } from '../../constants.ts/pagination';
import { AcademicFacultyService } from './academic-faculty.service';
import sendResponse from '../../../shared/send-response';
import { academicFacultyFilterFields } from './academic-faculty.constant';
import { IAcademicFaculty } from './academic-faculty.interface';

const createFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const academicFaculty = req.body;

    const result = await AcademicFacultyService.createAcademicFaculty(
      academicFaculty
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Faculty created Successfully!',
    });
    next();
  }
);
const getAllFaculty: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions: PaginationOption = pick(
      req.query,
      paginationFields
    );

    const filters = pick(req.query, academicFacultyFilterFields);

    const result = await AcademicFacultyService.getAllFaculty(
      paginationOptions,
      filters
    );

    sendResponse<IAcademicFaculty[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AcademicFacultyService.getSingleFaculty(id);

  return sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const updateFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const result = await AcademicFacultyService.updateFaculty(id, updateData);

  return sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Updated Successfully!',
    data: result,
  });
});

const deleteFaculty: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AcademicFacultyService.deleteFaculty(id);

  return sendResponse<IAcademicFaculty>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Faculty Deleted Successfully!',
  });
});

export const AcademicFacultyController = {
  createFaculty,
  getAllFaculty,
  getSingleFaculty,
  updateFaculty,
  deleteFaculty,
};
