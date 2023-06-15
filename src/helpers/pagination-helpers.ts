import { PaginationOption } from '../app/interfaces/pagination';

const paginationCalculation = (
  options: PaginationOption
): Required<{ skip: number } & PaginationOption> => {
  const {
    page = 1,
    limit = 10,
    sortBy = 'createdAt',
    sortOrder = 'desc',
  } = options;
  const skip = page * limit - limit;

  return {
    page,
    limit,
    skip,
    sortBy,
    sortOrder,
  };
};

export const paginationHelpers = {
  paginationCalculation,
};
