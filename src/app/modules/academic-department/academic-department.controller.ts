import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catch-async';
import { PaginationOption } from '../../interfaces/pagination';
import pick from '../../../shared/pick';
import { paginationFields } from '../../constants.ts/pagination';
import { AcademicDepartmentService } from './academic-department.service';
import sendResponse from '../../../shared/send-response';
import { academicDepartmentFilterFields } from './academic-department.constant';
import { IAcademicDepartment } from './academic-department.interface';

const createDepartment: RequestHandler = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const academicDepartment = req.body;

    const result = await AcademicDepartmentService.createAcademicDepartment(
      academicDepartment
    );

    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      data: result,
      message: 'Department created Successfully!',
    });
    next();
  }
);
const getAllDepartment: RequestHandler = catchAsync(
  async (req: Request, res: Response) => {
    const paginationOptions: PaginationOption = pick(
      req.query,
      paginationFields
    );

    const filters = pick(req.query, academicDepartmentFilterFields);

    const result = await AcademicDepartmentService.getAllDepartment(
      paginationOptions,
      filters
    );

    sendResponse<IAcademicDepartment[]>(res, {
      statusCode: httpStatus.OK,
      success: true,
      meta: result.meta,
      data: result.data,
    });
  }
);

const getSingleDepartment: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AcademicDepartmentService.getSingleDepartment(id);

  return sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    data: result,
  });
});

const updateDepartment: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;
  const updateData = req.body;

  const result = await AcademicDepartmentService.updateDepartment(
    id,
    updateData
  );

  return sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department Updated Successfully!',
    data: result,
  });
});

const deleteDepartment: RequestHandler = catchAsync(async (req, res) => {
  const { id } = req.params;

  const result = await AcademicDepartmentService.deleteDepartment(id);

  return sendResponse<IAcademicDepartment>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Department Deleted Successfully!',
  });
});

export const AcademicDepartmentController = {
  createDepartment,
  getAllDepartment,
  getSingleDepartment,
  updateDepartment,
  deleteDepartment,
};
