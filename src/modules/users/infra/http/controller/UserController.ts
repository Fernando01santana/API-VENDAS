import CreateUserService from '@modules/users/services/CreateUserService';
import RemoveUserService from '@modules/users/services/RemoveUserService';
import UpdateUserService from '@modules/users/services/UpdateUserService';
import ListUsersService from '@modules/users/services/ListUsersServices';

import { Request, Response } from 'express';
import { container } from 'tsyringe';

class UserController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { name, email, password } = request.body;

        const createUserService = container.resolve(CreateUserService);
        const user = await createUserService.execute({ name, email, password });
        return response.json({ user, status: 200 });
    }

    public async remove(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const removeUserService = container.resolve(RemoveUserService);
        const user = await removeUserService.execute({ id });
        return response.json({ user, status: 200 });
    }

    public async update(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { id } = request.params;
        const { name, email, password } = request.body;
        const updateUserService = container.resolve(UpdateUserService);
        const user = await updateUserService.execute({
            id,
            name,
            email,
            password,
        });
        return response.json({ user, status: 200 });
    }

    public async list(request: Request, response: Response): Promise<Response> {
        const listUsers = container.resolve(ListUsersService);
        const allUsers = await listUsers.execute();
        return response.json({ allUsers, status: 200 });
    }
}

export default UserController;
