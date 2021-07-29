import { Request, Response } from 'express';
import SendForgoutPassowrdService from '../services/SendForgoutPasswordService';

class ForgoutPasswordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { email } = request.body;
        const sendForgoutPassowrdService = new SendForgoutPassowrdService();
        await sendForgoutPassowrdService.execute({ email });
        return response.status(204).json();
    }
}

export default ForgoutPasswordController;
