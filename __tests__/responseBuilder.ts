import { Response } from 'express';
import ResponseBuilder from '../utils/ResponseBuilder';

describe('ResponseBuilder', () => {
    test('should build a response with correct structure', () => {
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        const mockData = { key: 'value' };
        const mockMeta = {
            page: 1,
            size: 10,
            totalData: 20,
            totalPages: 2,
        };

        ResponseBuilder.response({
            res: mockResponse,
            code: 200,
            data: mockData,
            message: 'Success',
            meta: mockMeta,
        });

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Success',
            data: mockData,
            meta: mockMeta,
        });
    });

    test('should build a response with default meta values', () => {
        const mockResponse = {
            status: jest.fn().mockReturnThis(),
            json: jest.fn(),
        } as unknown as Response;

        const mockData = { key: 'value' };

        ResponseBuilder.response({
            res: mockResponse,
            code: 200,
            data: mockData,
            message: 'Success',
        });

        expect(mockResponse.status).toHaveBeenCalledWith(200);
        expect(mockResponse.json).toHaveBeenCalledWith({
            message: 'Success',
            data: mockData,
            meta: {
                page: 1,
                size: 10,
                totalData: 0,
                totalPages: 0,
            },
        });
    });
});
