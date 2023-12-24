import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { IUsers } from '../models/Users';
import RepoUsers from '../repositories/RepoUsers';
import ServiceAuth, { JWT_KEY } from '../services/ServiceAuth';
import ClientError from '../utils/ClientError';

jest.mock('bcrypt');
jest.mock('jsonwebtoken');

describe('ServiceAuth', () => {
    let mockRepoUser: RepoUsers;
    let serviceAuth: ServiceAuth;

    beforeEach(() => {
        mockRepoUser = {
            findByUsername: jest.fn(),
            create: jest.fn(),
            findById: jest.fn(),
        } as unknown as RepoUsers;

        serviceAuth = new ServiceAuth(mockRepoUser);
    });

    describe('login', () => {
        test('should return to ClientError if the user is not found', async () => {
            (mockRepoUser.findByUsername as jest.Mock).mockResolvedValueOnce(undefined);

            await expect(serviceAuth.login({ username: 'usernotexists', password: 'password' })).rejects.toThrow(
                ClientError
            );
        });

        test('should return ClientError if the password is wrong', async () => {
            const mockUser: IUsers = {
                id: '3',
                username: 'userexists',
                password: 'hashedPassword',
                role: 'userexists',
                email: 'userexists@rental-cars.com',
                created_at: new Date().toLocaleString(),
                updated_at: new Date().toLocaleString(),
            };
            (mockRepoUser.findByUsername as jest.Mock).mockResolvedValueOnce(mockUser);
            (bcrypt.compareSync as jest.Mock).mockReturnValueOnce(false);

            await expect(serviceAuth.login({ username: 'userexists', password: 'wrongPassword' })).rejects.toThrow(
                ClientError
            );
        });

        test('should return token if the login is success :)', async () => {
            const mockUser: IUsers = {
                id: '3',
                username: 'userexists',
                password: 'hashedPassword',
                role: 'userexists',
                email: 'userexists@rental-cars.com',
                created_at: new Date().toLocaleString(),
                updated_at: new Date().toLocaleString(),
            };
            (mockRepoUser.findByUsername as jest.Mock).mockResolvedValueOnce(mockUser);
            (bcrypt.compareSync as jest.Mock).mockReturnValueOnce(true);
            (jwt.sign as jest.Mock).mockReturnValueOnce('mockedToken');

            const result = await serviceAuth.login({ username: 'userexists', password: 'validPassword' });

            expect(result).toEqual('mockedToken');
        });
    });

    describe('register', () => {
        test('should encrypt password and call repoUsers function create to register user', async () => {
            const mockRegisterUser = {
                username: 'afriyan',
                password: 'hashPassword',
                email: 'afriyan@rental-cars.com',
                role: 'user',
                created_at: new Date().toLocaleString(),
                updated_at: new Date().toLocaleString(),
            };
            const mockEncryptedPassword = 'hashPassword';

            jest.spyOn(serviceAuth, 'encryptPassword').mockReturnValueOnce(mockEncryptedPassword);
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            jest.spyOn(mockRepoUser, 'create').mockResolvedValueOnce({} as any);

            await serviceAuth.register(mockRegisterUser);

            expect(serviceAuth.encryptPassword).toHaveBeenCalledWith(mockRegisterUser.password);
            expect(mockRepoUser.create).toHaveBeenCalledWith({ ...mockRegisterUser, password: mockEncryptedPassword });
        });
    });

    describe('getUserById', () => {
        test('should call repoUsers function findById and return the user by id', async () => {
            const mockUser: IUsers = {
                id: '3',
                username: 'afriyan',
                password: 'hashPassword',
                role: 'user',
                email: 'afriyan@rental-cars.com',
                created_at: new Date().toLocaleString(),
                updated_at: new Date().toLocaleString(),
            };
            (mockRepoUser.findById as jest.Mock).mockResolvedValueOnce(mockUser);

            const result = await serviceAuth.getUserById('3');

            expect(result).toEqual(mockUser);
            expect(mockRepoUser.findById).toHaveBeenCalledWith('3');
        });
    });

    describe('generateToken', () => {
        test('should call jwt.sign to generate token and return a token', () => {
            const mockUser: IUsers = {
                id: '3',
                username: 'afriyan',
                password: 'hashPassword',
                role: 'user',
                email: 'afriyan@rental-cars.com',
                created_at: new Date().toLocaleString(),
                updated_at: new Date().toLocaleString(),
            };
            (jwt.sign as jest.Mock).mockReturnValue('mockedToken');

            const result = serviceAuth.generateToken(mockUser);

            expect(result).toEqual('mockedToken');
            expect(jwt.sign).toHaveBeenCalledWith({ ...mockUser }, JWT_KEY);
        });
    });

    describe('encryptPassword', () => {
        test('should call bcrypt function hashSync and return the hashed password if success', () => {
            const mockPassword = 'password';
            const mockHashedPassword = 'hashPassword';
            const bcryptHashSyncMock = jest.spyOn(bcrypt, 'hashSync').mockReturnValueOnce(mockHashedPassword);

            const result = serviceAuth.encryptPassword(mockPassword);

            expect(result).toEqual(mockHashedPassword);
            expect(bcryptHashSyncMock).toHaveBeenCalledWith(mockPassword, 10);
        });
    });

    describe('validateToken', () => {
        test('should call jwt.verify to verify user and return the decoded user if success', () => {
            const mockUser: IUsers = {
                id: '3',
                username: 'afriyan',
                password: 'hashPassword',
                role: 'user',
                email: 'afriyan@rental-cars.com',
                created_at: new Date().toLocaleString(),
                updated_at: new Date().toLocaleString(),
            };
            (jwt.verify as jest.Mock).mockReturnValueOnce(mockUser);

            const result = serviceAuth.validateToken('mockedToken');

            expect(result).toEqual(mockUser);
            expect(jwt.verify).toHaveBeenCalledWith('mockedToken', JWT_KEY);
        });
    });

    describe('validateRole', () => {
        test('if user role matches the provided role return true', () => {
            const mockUser: IUsers = {
                id: '3',
                username: 'afriyan',
                password: 'hashPassword',
                role: 'user',
                email: 'afriyan@rental-cars.com',
                created_at: new Date().toLocaleString(),
                updated_at: new Date().toLocaleString(),
            };

            const result = serviceAuth.validateRole(mockUser as IUsers, 'user');

            expect(result).toBeTruthy();
        });

        test('if user role does not match the provided role return false', () => {
            const mockUser: IUsers = {
                id: '3',
                username: 'superfranky',
                password: 'superfranky',
                role: 'admin',
                email: 'superfranky@rental-cars.com',
                created_at: new Date().toLocaleString(),
                updated_at: new Date().toLocaleString(),
            };

            const result = serviceAuth.validateRole(mockUser, 'user');

            expect(result).toBeFalsy();
        });
    });
});
