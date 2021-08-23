import { Request, Response } from 'express';
import SendForgoutPassowrdService from '@modules/users/services/SendForgoutPasswordService';
import { container } from 'tsyringe';

class ForgoutPasswordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email } = request.body;
        const sendForgoutPassowrdService = container.resolve(
            SendForgoutPassowrdService,
        );
        await sendForgoutPassowrdService.execute(email);
        return response.status(204).json();
    }
}

export default ForgoutPasswordController;
