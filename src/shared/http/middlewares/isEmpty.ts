import AppError from '@shared/errors/AppError';
import { Request, Response, NextFunction } from 'express';

export default function isEmpty(
    request: Request,
    response: Response,
    next: NextFunction,
): void {
    const { email, name, password } = request.body;
    if (
        !email ||
        email === '' ||
        !name ||
        name === '' ||
        !password ||
        password === ''
    ) {
        throw new AppError('informe os parametros corretamente!');
    }
    return next();
}
