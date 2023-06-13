import { Response } from 'express';
type IApiResponse<T> = {
  statusCode: number;
  success: boolean;
  message?: string | null;
  data?: T;
};
const sendResponse = <T>(res: Response, data: IApiResponse<T>): void => {
  const responseData: IApiResponse<T> = {
    statusCode: data.statusCode,
    success: data.success,
    ...(data.message ? { message: data.message } : null),
    ...(data.data ? { data: data.data } : null),
  };
  res.status(data.statusCode).json(responseData);
};

export default sendResponse;
