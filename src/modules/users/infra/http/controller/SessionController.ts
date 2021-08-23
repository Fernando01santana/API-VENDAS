import { Request, Response } from 'express';
import CreateSessionService from '@modules/users/services/CreateSessionService';
import { container } from 'tsyringe';

class SessionController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email, password } = request.body;
        const createSessionService = container.resolve(CreateSessionService);
        const session = await createSessionService.execute({ email, password });
        return response.json(session);
    }
}

export default SessionController;
