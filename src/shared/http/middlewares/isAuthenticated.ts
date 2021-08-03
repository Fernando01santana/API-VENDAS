import AppError from '@shared/errors/AppError';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import tokenSecret from '@config/auth';

//interface from object return
interface ITokenPayload {
    iat: number;
    exp: number;
    sub: string;
}
//export function
export default function isAuthenticated(
    request: Request,
    response: Response,
    //argument from continue process
    next: NextFunction,
    //return empty
): void {
    //get token in headers from request
    const authHeader = request.headers.authorization;
    if (!authHeader) {
        throw new AppError('JWT token is missing');
    }

    //get part token
    const [, token] = authHeader.split(' ');

    try {
        //verify token
        const decodedToken = jwt.verify(token, tokenSecret.jwt.secret);
        //get sub from object token
        const { sub } = decodedToken as ITokenPayload;

        request.user = {
            id: sub,
        };
        return next();
    } catch (error) {
        throw new AppError('Invalid JWT token');
    }
}
