import { Router } from 'express';
import UserController from '@modules/users/controller/UserController';
import SessionController from '@modules/users/controller/SessionController';
import UsersAvatarController from '@modules/users/controller/UserAvatarController';
import ProfileController from '../controller/ProfileController';
import isAuthenticated from '../../../shared/http/middlewares/isAuthenticated';
import multer from 'multer';

import uploadConfig from '@config/upload';

const userRouter = Router();
const userController = new UserController();
const sessionController = new SessionController();
const userAvatarController = new UsersAvatarController();
const profileController = new ProfileController();

const upload = multer(uploadConfig);

userRouter.put('/update', isAuthenticated, userController.update);
userRouter.post('/create/session', sessionController.create);
userRouter.post('/create', userController.create);
userRouter.put('/remove', isAuthenticated, userController.remove);
userRouter.get('/list', userController.list);
userRouter.post('/auth', sessionController.create);

userRouter.patch(
    '/upload/avatar',
    isAuthenticated,
    upload.single('avatar'),
    userAvatarController.update,
);

userRouter.get('/profile', isAuthenticated, profileController.profile);
userRouter.get(
    '/profile/update',
    isAuthenticated,
    profileController.updateProfile,
);
export default userRouter;
