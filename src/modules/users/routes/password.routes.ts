import { Router } from 'express';
import ForgoutPasswordController from '@modules/users/controller/ForgoutPasswordController';
import ResetPasswordController from '../controller/ResetPasswordController';

const forgoutRouter = Router();
const forgoutPasswordController = new ForgoutPasswordController();
const resetPasswordController = new ResetPasswordController();

forgoutRouter.post('/password', forgoutPasswordController.create);
forgoutRouter.post('/reset', resetPasswordController.create);
export default forgoutRouter;
