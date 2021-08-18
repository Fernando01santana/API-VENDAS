import ShowProfileService from '@modules/users/services/ShowProfileService';
import UpdateProfileService from '@modules/users/services/UpdateProfileService';
import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';

class ProfileController {
    public async profile(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const profileUser = new ShowProfileService();
        const userProfile = await profileUser.execute({ user_id });
        return response.json(classToClass(userProfile));
    }

    public async updateProfile(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, password, old_password, email } = request.body;
        const user_id = request.user.id;
        const updateProfile = new UpdateProfileService();
        const user = await updateProfile.execute({
            name,
            password,
            email,
            old_password,
            user_id,
        });
        return response.json(classToClass(user));
    }
}

export default ProfileController;
