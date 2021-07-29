import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import { Request, Response } from 'express';

class UserAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateUserAvatar = new UpdateUserAvatarService();
        const fileName = request.file?.filename;
        const avatar = updateUserAvatar.execute({
            fileName,
            user_id: request.user.id,
        });
        return response.json({ avatar, status: 200 });
    }
}

export default UserAvatarController;
