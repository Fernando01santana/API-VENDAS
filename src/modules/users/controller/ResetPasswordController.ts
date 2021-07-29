import { Request, Response } from 'express';
import ResetPasswordService from '../services/ResetPassowordService';

class ResetPasswordController {
    public async create(
        request: Request,
        response: Response,
    ): Promise<Response> {
        const { password, token } = request.body;
        // const { token } = request.headers.authorization;
        const resetPasswordService = new ResetPasswordService();
        await resetPasswordService.execute({ password, token });
        return response.status(204).json();
    }
}

export default ResetPasswordController;
