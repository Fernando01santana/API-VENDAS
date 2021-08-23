import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UserAvatarController {
    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const updateUserAvatar = container.resolve(UpdateUserAvatarService);
        const fileName = request.file?.filename;
        const avatar = updateUserAvatar.execute({
            fileName,
            user_id: request.user.id,
        });
        return response.json({ avatar, status: 200 });
    }
}

export default UserAvatarController;
