import express from 'express';
import validateRequest from '../../middlewares/validate-request';
import { AcademicFacultyController } from './academic-faculty.controller';
import { AcademicFacultyValidation } from './academic-faculty.validation';

const router = express.Router();

router.route('/').get(AcademicFacultyController.getAllFaculty);

router
  .route('/create-faculty')
  .post(
    validateRequest(AcademicFacultyValidation.createAcademicFacultyZodSchema),
    AcademicFacultyController.createFaculty
  );

router
  .route('/:id')
  .get(AcademicFacultyController.getSingleFaculty)
  .patch(
    validateRequest(AcademicFacultyValidation.updateAcademicFacultyZodSchema),
    AcademicFacultyController.updateFaculty
  )
  .delete(AcademicFacultyController.deleteFaculty);

export const AcademicFacultyRoute = router;
