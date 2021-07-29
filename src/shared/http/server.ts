import express, { NextFunction, Request, Response } from 'express';
import 'reflect-metadata';
import cors from 'cors';
import routes from './routes';
import AppError from '@shared/errors/AppError';
import '@shared/typeorm/index';
import { errors } from 'celebrate';
import uploadConfig from '@config/upload';
const app = express();

//definido rota estatica
app.use(cors());
app.use(express.json());
app.use(errors());
app.use('/files', express.static(uploadConfig.directory));
app.use(routes);
app.use(
    (
        error: Error,
        request: Request,
        response: Response,
        next: NextFunction,
    ) => {
        if (error instanceof AppError) {
            return response.status(error.statusCode).json({
                status: 'Error',
                message: error.message,
            });
        }
        return response.status(500).json({
            status: 'Error',
            message: 'Iternal server error',
        });
    },
);
app.listen(3333, () => {
    console.log('Server started on port 3333! 🏆 ');
});
