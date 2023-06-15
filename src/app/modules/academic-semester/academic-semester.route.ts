import express from 'express';
import { AcademicSemesterValidation } from './academic-semester.validation';
import validateRequest from '../../middlewares/validate-request';
import { AcademicSemesterController } from './academic-semester.controller';

const router = express.Router();

router.route('/').get(AcademicSemesterController.getAllSemester);

router
  .route('/create-semester')
  .post(
    validateRequest(AcademicSemesterValidation.createAcademicSemesterZodSchema),
    AcademicSemesterController.createSemester
  );

router
  .route('/:id')
  .get(AcademicSemesterController.getSingleSemester)
  .patch(
    validateRequest(AcademicSemesterValidation.updateAcademicSemesterZodSchema),
    AcademicSemesterController.updateSemester
  )
  .delete(AcademicSemesterController.deleteSemester);

export const AcademicSemesterRoute = router;
