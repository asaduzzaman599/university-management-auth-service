import { NextFunction, Request, RequestHandler, Response } from 'express';
import httpStatus from 'http-status';
import catchAsync from '../../../shared/catch-async';
import sendResponse from '../../../shared/send-response';
import { AcademicSemesterService } from './academic-semester.service';

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

export const AcademicSemesterController = {
  createSemester,
};
