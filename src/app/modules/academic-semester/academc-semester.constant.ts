import {
  AcademicSemesterCode,
  AcademicSemesterTitle,
  Month,
} from './academic-semester.interface';

const academicSemesterMonth: Month[] = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

const academicSemesterCode: AcademicSemesterCode[] = ['01', '02', '03'];

const academicSemesterTitle: AcademicSemesterTitle[] = [
  'Autumn',
  'Summer',
  'Spring',
];

export const AcademicSemesterConstant = {
  academicSemesterMonth,
  academicSemesterCode,
  academicSemesterTitle,
};

export const academicSemesterTitleCoderMapper: Record<string, string> = {
  Spring: '01',
  Summer: '02',
  Autumn: '03',
};
