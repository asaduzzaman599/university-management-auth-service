import { ErrorRequestHandler, NextFunction, Request, Response } from 'express';
import { ZodError } from 'zod';
import config from '../../config';
import ApiError from '../../errors/ApiError';
import handleValidationError from '../../errors/handle-validation-error';
import { errorLogger } from '../../shared/logger';
import { IGenericErrorMessage } from '../interfaces/error-message.interface';
import { IGenericErrorResponse } from '../interfaces/error-response.interface';
import handleZodError from '../../errors/handle-zod-error';
import handleCastError from '../../errors/handle-cast-error';

//global Error Handler
const globalErrorHandler: ErrorRequestHandler = (
  err,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // eslint-disable-next-line no-unused-expressions
  config.env === 'development'
    ? // eslint-disable-next-line no-console
      console.log('Global Error Handler ===>', err)
    : errorLogger.error('Global Error Handler ===>', err);

  let statusCode = 400;
  let message = 'Something Went Wrong!';
  let errorMessage: IGenericErrorMessage[] = [];

  if (err?.name === 'ValidationError') {
    const simplifiedError: IGenericErrorResponse = handleValidationError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessages;
  } else if (err instanceof ZodError) {
    const simplifiedError: IGenericErrorResponse = handleZodError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessages;
  } else if (err instanceof ApiError) {
    statusCode = err?.statusCode;
    message = err.message;
    errorMessage = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  } else if (err.name === 'CastError') {
    const simplifiedError: IGenericErrorResponse = handleCastError(err);
    statusCode = simplifiedError.statusCode;
    message = simplifiedError.message;
    errorMessage = simplifiedError.errorMessages;
  } else if (err instanceof Error) {
    message = err?.message;
    errorMessage = err?.message
      ? [
          {
            path: '',
            message: err?.message,
          },
        ]
      : [];
  }

  return res.status(statusCode).json({
    success: false,
    message,
    errorMessage,
    ...(config.env !== 'production' ? { stack: err.stack } : null),
  });
};

export default globalErrorHandler;
