import { NextFunction, Request, Response } from 'express';
import { IRestController } from '../../interfaces/IRest';
import ServiceCars from '../../services/ServiceCars';
import { IUsers } from '../../models/Users';
import { ICars } from '../../models/Cars';
import { IRequestWithAuth } from '../../middlewares/Auth';
import ResponseBuilder from '../../utils/ResponseBuilder';
import media from '../../config/media';
import { type UploadApiErrorResponse } from 'cloudinary';

class ControllerCars {
    private _serviceCars: ServiceCars;

    constructor(serviceCars: ServiceCars) {
        this._serviceCars = serviceCars;
    }

    upload() {
        return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
            try {
                if (req.file) {
                    const fileBase64 = req.file.buffer.toString('base64');
                    const file = `data:${req.file.mimetype};base64,${fileBase64}`;
                    const resultUpload = await media.storage.uploader.upload(file, (err, result) => {
                        if (err) {
                            return ResponseBuilder.response({
                                code: 403,
                                res,
                                data: 'failed upload to storage',
                            });
                        }
                        return result;
                    });

                    return ResponseBuilder.response({
                        code: 200,
                        res,
                        data: resultUpload,
                    });
                }

                ResponseBuilder.response({
                    code: 404,
                    res,
                    data: 'file not found',
                });
            } catch (error) {
                ResponseBuilder.response({
                    code: 500,
                    data: 'upload failed',
                    res,
                });
            }
        };
    }

    create() {
        const serviceCars = this._serviceCars;
        return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
            console.log(req.body);
            try {
                serviceCars.setUser = req.user as IUsers;

                const result = await serviceCars.create(req.body as ICars);

                return ResponseBuilder.response({
                    res,
                    code: 201,
                    data: result,
                    message: 'Add new car success',
                });
            } catch (error) {
                next(error);
            }
        };
    }

    list() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const query = req.query;
                const result = await this._serviceCars.list(query);
                const totalPages = Math.floor(result.total / Number(query?.size ?? 10)) + 1;

                return ResponseBuilder.response({
                    res,
                    code: 200,
                    data: result.results,
                    message: 'Get cars data success',
                    meta: {
                        page: query?.page ? Number(query?.page) : 1,
                        size: query?.size ? Number(query?.size) : 10,
                        totalData: result.total,
                        totalPages,
                    },
                });
            } catch (error) {
                next(error);
            }
        };
    }

    show() {
        return async (req: Request, res: Response, next: NextFunction) => {
            try {
                const id = req.params?.id;
                const result = await this._serviceCars.show(id);

                return ResponseBuilder.response({
                    res,
                    code: 200,
                    data: result,
                    message: 'Get car data success',
                });
            } catch (error) {
                next(error);
            }
        };
    }

    update() {
        const serviceCars = this._serviceCars;
        return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
            try {
                const id = req.params?.id;
                serviceCars.setUser = req.user as IUsers;

                const result = await serviceCars.update(id, req.body as ICars);
                return ResponseBuilder.response({
                    res,
                    code: 200,
                    data: result,
                    message: 'Update car success',
                });
            } catch (error) {
                next(error);
            }
        };
    }

    remove() {
        const serviceCars = this._serviceCars;
        return async (req: IRequestWithAuth, res: Response, next: NextFunction) => {
            try {
                serviceCars.setUser = req.user as IUsers;
                const id = req.params?.id;
                const result = await serviceCars.remove(id);

                return ResponseBuilder.response({
                    res,
                    code: 200,
                    data: result,
                    message: 'Delete car success',
                });
            } catch (error) {
                next(error);
            }
        };
    }
}

export default ControllerCars;
