import express from 'express';
import validateRequest from '../../middlewares/validate-request';
import { AcademicDepartmentController } from './academic-department.controller';
import { AcademicDepartmentValidation } from './academic-department.validation';

const router = express.Router();

router.route('/').get(AcademicDepartmentController.getAllDepartment);

router
  .route('/create-department')
  .post(
    validateRequest(
      AcademicDepartmentValidation.createAcademicDepartmentZodSchema
    ),
    AcademicDepartmentController.createDepartment
  );

router
  .route('/:id')
  .get(AcademicDepartmentController.getSingleDepartment)
  .patch(
    validateRequest(
      AcademicDepartmentValidation.updateAcademicDepartmentZodSchema
    ),
    AcademicDepartmentController.updateDepartment
  )
  .delete(AcademicDepartmentController.deleteDepartment);

export const AcademicDepartmentRoute = router;
