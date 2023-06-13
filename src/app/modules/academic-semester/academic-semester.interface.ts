import { Model } from 'mongoose';

export type Month =
  | 'January'
  | 'February'
  | 'March'
  | 'April'
  | 'May'
  | 'June'
  | 'July'
  | 'August'
  | 'September'
  | 'October'
  | 'November'
  | 'December';

export type AcademicSemesterTitle = 'Autumn' | 'Summer' | 'Spring';

export type AcademicSemesterCode = '01' | '02' | '03';

export type IAcademicSemester = {
  title: AcademicSemesterTitle;
  year: number;
  code: AcademicSemesterCode;
  startMonth: Month;
  endMonth: Month;
};

export type AcademicSemesterModel = Model<
  IAcademicSemester,
  Record<string, unknown>
>;
