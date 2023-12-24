import ClientError from '../utils/ClientError';

describe('ClientError', () => {
    test('should create an instance of ClientError', () => {
        const errorMessage = 'Client error message:(';
        const statusCode = 400;

        const clientError = new ClientError(errorMessage, statusCode);

        expect(clientError).toBeInstanceOf(ClientError);
        expect(clientError.message).toBe(errorMessage);
        expect(clientError.statusCode).toBe(statusCode);
    });

    test('should have the correct name and properties', () => {
        const errorMessage = 'Client error message:(';
        const statusCode = 400;

        const clientError = new ClientError(errorMessage, statusCode);

        expect(clientError.name).toBe('client error');
        expect(clientError.message).toBe(errorMessage);
        expect(clientError.statusCode).toBe(statusCode);
    });
});
