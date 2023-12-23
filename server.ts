import express, { Express, NextFunction, Request, Response } from 'express';
import path from 'path';
import 'dotenv/config';

import apiRouter from './routes/api';
import ResponseBuilder from './utils/ResponseBuilder';
import cors from 'cors';

const PORT = process.env.PORT || 8000;
const PUBLIC_DIR = path.join(__dirname, 'public');

class Server {
    private app: Express;
    constructor() {
        this.app = express();

        this.app.use(express.static(PUBLIC_DIR));
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(express.json());
        this.app.use(cors());

        this.app.use('/api', apiRouter);

        this.app.use(this.notFoundHandler);
        this.app.use(this.errorHandler);
    }

    private notFoundHandler(req: Request, res: Response, next: NextFunction) {
        return ResponseBuilder.response({
            res,
            code: 404,
            message: 'resource, data or page not found',
            data: '404 NOT FOUND',
        });
    }

    private errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
        console.log(err.stack);
        return ResponseBuilder.response({
            res,
            code: err?.statusCode ?? 500,
            message: err.message,
            data: err.name,
        });
    }

    public run() {
        this.app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });
    }
}

new Server().run();
