import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { IUsers } from '../models/Users';
import { JWT_KEY } from '../services/ServiceAuth';

export interface IRequestWithAuth extends Request {
    user?: IUsers;
}

class Auth {
    constructor() {}

    async authorize(req: IRequestWithAuth, res: Response, next: NextFunction) {
        const headers = req.headers;

        if (!headers.authorization) {
            return res.status(403).json({
                data: 'not authorized',
            });
        }

        try {
            const bearerToken = `${headers.authorization}`.split('Bearer ');
            const token = bearerToken[1];
            const userData = jwt.verify(`${token}`, JWT_KEY) as IUsers;

            const isSuperAdminOrAdmin =
                userData.role === 'superadmin' || userData.role === 'admin' ? userData.role : false;

            // console.log(isSuperAdminOrAdmin);

            if (!isSuperAdminOrAdmin) {
                return res.status(403).json({
                    data: 'not authorized, only superadmin and admin role',
                });
            }

            req.user = userData;
            next();
        } catch (error) {
            res.status(401).json({
                message: 'token does not match',
            });
        }
    }

    async authorizeSuperAdmin(req: IRequestWithAuth, res: Response, next: NextFunction) {
        const headers = req.headers;

        if (!headers.authorization) {
            return res.status(403).json({
                data: 'not authorized',
            });
        }

        try {
            const bearerToken = `${headers.authorization}`.split('Bearer ');
            const token = bearerToken[1];
            const userData = jwt.verify(`${token}`, JWT_KEY) as IUsers;

            if (!(userData.role === 'superadmin')) {
                return res.status(403).json({
                    data: 'not authorized, only superadmin role',
                });
            }

            req.user = userData;
            next();
        } catch (error) {
            res.status(401).json({
                message: 'token does not match',
            });
        }
    }

    async authorizeUser(req: IRequestWithAuth, res: Response, next: NextFunction) {
        const headers = req.headers;

        if (!headers.authorization) {
            return res.status(403).json({
                data: 'not authorized',
            });
        }

        try {
            const bearerToken = `${headers.authorization}`.split('Bearer ');
            const token = bearerToken[1];
            const userData = jwt.verify(`${token}`, JWT_KEY) as IUsers;

            req.user = userData;
            next();
        } catch (error) {
            res.status(401).json({
                message: 'token does not match',
            });
        }
    }
}

export default Auth;
