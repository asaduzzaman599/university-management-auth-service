import mongoose from 'mongoose';
import { IGenericErrorMessage } from '../app/interfaces/error-message.interface';
import { IGenericErrorResponse } from '../app/interfaces/error-response.interface';

const handleValidationError = (
  err: mongoose.Error.ValidationError
): IGenericErrorResponse => {
  const errors: IGenericErrorMessage[] = Object.values(err.errors).map(
    (el: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
      path: el.path,
      message: el.message,
    })
  );
  const statusCode = 400;

  return {
    statusCode,
    message: ' Validation Error',
    errorMessages: errors,
  };
};

export default handleValidationError;
