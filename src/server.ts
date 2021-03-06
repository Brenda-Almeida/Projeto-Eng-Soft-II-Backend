import 'reflect-metadata';
import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';
import AppError from './errors/AppError';
import './database';

require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(
    (err: Error, request: Request, response: Response, _next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                status: 'error',
                message: err.message,
            });
        }
        console.log(err);
        return response.status(500).json({
            status: 'error',
            message: 'Internal serverError',
        });
    },
);

app.listen(3333, () => {
    console.log('Server on');
});
