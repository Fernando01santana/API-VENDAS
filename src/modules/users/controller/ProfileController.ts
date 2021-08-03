import ShowProfileService from '../services/ShowProfileService';
import UpdateProfileService from '../services/UpdateProfileService';
import { Request, Response } from 'express';

class ProfileController {
    public async profile(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const user_id = request.user.id;
        const profileUser = new ShowProfileService();
        const userProfile = await profileUser.execute({ user_id });
        return response.json({ userProfile, status: 200 });
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
        return response.json({ user, status: 200 });
    }
}

export default ProfileController;
