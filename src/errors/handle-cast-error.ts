import mongoose from 'mongoose';
import { IGenericErrorResponse } from '../app/interfaces/error-response.interface';
import { IGenericErrorMessage } from '../app/interfaces/error-message.interface';

const handleCastError = (
  err: mongoose.Error.CastError
): IGenericErrorResponse => {
  const statusCode = 400;
  const message = `Invalid ${err.path}`;
  const errorMessages: IGenericErrorMessage[] = [
    {
      path: err.path,
      message: message,
    },
  ];
  return {
    statusCode,
    message,
    errorMessages,
  };
};

export default handleCastError;
