import { Router } from 'express';
import ForgoutPasswordController from '@modules/users/infra/http/controller/ForgoutPasswordController';
import ResetPasswordController from '../controller/ResetPasswordController';

const forgoutRouter = Router();
const forgoutPasswordController = new ForgoutPasswordController();
const resetPasswordController = new ResetPasswordController();

forgoutRouter.post('/password', forgoutPasswordController.create);
forgoutRouter.post('/reset', resetPasswordController.create);
export default forgoutRouter;
