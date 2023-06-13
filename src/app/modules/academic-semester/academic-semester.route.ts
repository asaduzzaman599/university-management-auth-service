import express from 'express';
import { AcademicSemesterValidation } from './academic-semester.validation';
import validateRequest from '../../middlewares/validate-request';
import { AcademicSemesterController } from './academic-semester.controller';

const router = express.Router();

router
  .route('/create-semester')
  .post(
    validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
    AcademicSemesterController.createSemester
  );

export const AcademicSemesterRoute = router;
