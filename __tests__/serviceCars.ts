import ServiceCars from '../services/ServiceCars';
import RepoCars, { IParams } from '../repositories/RepoCars';
import { IUsers } from '../models/Users';
import { ICars } from '../models/Cars';

jest.mock('../repositories/RepoCars');

describe('ServiceCars', () => {
    let serviceCars: ServiceCars;
    let mockRepoCars: RepoCars;
    let mockUser: IUsers;

    beforeEach(() => {
        mockRepoCars = new RepoCars();
        serviceCars = new ServiceCars(mockRepoCars);
        mockUser = {
            id: '3',
            username: 'afriyan',
            role: 'admin',
            password: 'password1933',
            email: 'afriyan@rental-cars.com',
            created_at: new Date().toLocaleString(),
            updated_at: new Date().toLocaleString(),
        };
    });

    describe('list', () => {
        test('should call RepoCars function list with params', async () => {
            const mockParams: IParams = {
                page: 1,
                size: 10,
                search: 'ford',
            };

            await serviceCars.list(mockParams);

            expect(mockRepoCars.list).toHaveBeenCalledWith(mockParams);
        });

        test('should return error if user is not set', async () => {
            const mockParams: IParams = {
                page: 1,
                size: 10,
                search: 'ford',
            };

            serviceCars.setUser = mockUser;

            expect(serviceCars.list(mockParams));
        });
    });

    describe('show', () => {
        test('should call RepoCars function show car by id', async () => {
            const mockCarId = 'car3';
            await serviceCars.show(mockCarId);

            expect(mockRepoCars.show).toHaveBeenCalledWith(mockCarId);
        });

        test('should return error if user is not set', async () => {
            const mockCarId = 'car3';
            serviceCars.setUser = mockUser;

            expect(serviceCars.show(mockCarId));
        });
    });

    describe('create', () => {
        test('should call RepoCars function create with user and data car', async () => {
            const mockCarData: ICars = {
                plate: 'DBH-3491',
                manufacture: 'Ford',
                model: 'F150',
                image: './images/car01.min.jpg',
                rent_per_day: 200000,
                capacity: 2,
                description:
                    ' Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.',
                available_at: '2022-03-23T15:49:05.563Z',
                transmission: 'Automatic',
                available: true,
                type: 'Sedan',
                year: '2022',
                options: ['Cruise Control', 'Tinted Glass', 'Tinted Glass', 'Tinted Glass', 'AM/FM Stereo'],
                specs: [
                    'Brake assist',
                    'Leather-wrapped shift knob',
                    'Glove box lamp',
                    'Air conditioning w/in-cabin microfilter',
                    'Body color folding remote-controlled pwr mirrors',
                    'Dual-stage front airbags w/occupant classification system',
                ],
                created_by: '3',
            };

            serviceCars.setUser = mockUser;

            await serviceCars.create(mockCarData);

            expect(mockRepoCars.create).toHaveBeenCalledWith(mockUser, mockCarData);
        });

        test('should return error if user is not set', async () => {
            const mockCarData: ICars = {
                plate: 'DBH-3491',
                manufacture: 'Ford',
                model: 'F150',
                image: './images/car01.min.jpg',
                rent_per_day: 200000,
                capacity: 2,
                description:
                    ' Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.',
                available_at: '2022-03-23T15:49:05.563Z',
                transmission: 'Automatic',
                available: true,
                type: 'Sedan',
                year: '2022',
                options: ['Cruise Control', 'Tinted Glass', 'Tinted Glass', 'Tinted Glass', 'AM/FM Stereo'],
                specs: [
                    'Brake assist',
                    'Leather-wrapped shift knob',
                    'Glove box lamp',
                    'Air conditioning w/in-cabin microfilter',
                    'Body color folding remote-controlled pwr mirrors',
                    'Dual-stage front airbags w/occupant classification system',
                ],
            };

            serviceCars.setUser = mockUser;

            expect(serviceCars.create(mockCarData));
        });
    });

    describe('update', () => {
        test('should call RepoCars function update with user, id, data car', async () => {
            const mockCarId = 'car123';
            const mockCarData: ICars = {
                plate: 'DBH-3491',
                manufacture: 'Ford',
                model: 'F150',
                image: './images/car01.min.jpg',
                rent_per_day: 200000,
                capacity: 2,
                description:
                    ' Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.',
                available_at: '2022-03-23T15:49:05.563Z',
                transmission: 'Automatic',
                available: true,
                type: 'Sedan',
                year: '2022',
                options: ['Cruise Control', 'Tinted Glass', 'Tinted Glass', 'Tinted Glass', 'AM/FM Stereo'],
                specs: [
                    'Brake assist',
                    'Leather-wrapped shift knob',
                    'Glove box lamp',
                    'Air conditioning w/in-cabin microfilter',
                    'Body color folding remote-controlled pwr mirrors',
                    'Dual-stage front airbags w/occupant classification system',
                ],
                created_by: '3',
                updated_by: '3',
            };
            serviceCars.setUser = mockUser;
            await serviceCars.update(mockCarId, mockCarData);

            expect(mockRepoCars.update).toHaveBeenCalledWith(mockUser, mockCarId, mockCarData);
        });

        test('should return error if user is not set', async () => {
            const mockCarId = 'car123';
            const mockCarData: ICars = {
                plate: 'DBH-3491',
                manufacture: 'Ford',
                model: 'F150',
                image: './images/car01.min.jpg',
                rent_per_day: 200000,
                capacity: 2,
                description:
                    ' Brake assist. Leather-wrapped shift knob. Glove box lamp. Air conditioning w/in-cabin microfilter.',
                available_at: '2022-03-23T15:49:05.563Z',
                transmission: 'Automatic',
                available: true,
                type: 'Sedan',
                year: '2022',
                options: ['Cruise Control', 'Tinted Glass', 'Tinted Glass', 'Tinted Glass', 'AM/FM Stereo'],
                specs: [
                    'Brake assist',
                    'Leather-wrapped shift knob',
                    'Glove box lamp',
                    'Air conditioning w/in-cabin microfilter',
                    'Body color folding remote-controlled pwr mirrors',
                    'Dual-stage front airbags w/occupant classification system',
                ],
            };
            serviceCars.setUser = mockUser;

            expect(serviceCars.update(mockCarId, mockCarData));
        });
    });

    describe('remove', () => {
        test('should call RepoCars function remove with user and car id', async () => {
            const mockCarId = 'car3';
            serviceCars.setUser = mockUser;
            await serviceCars.remove(mockCarId);

            expect(mockRepoCars.remove).toHaveBeenCalledWith(mockUser, mockCarId);
        });

        test('should return error if user is not set', async () => {
            const mockCarId = 'car3';
            serviceCars.setUser = mockUser;

            expect(serviceCars.remove(mockCarId));
        });
    });

    describe('count', () => {
        test('should call RepoCars function count with params', async () => {
            const mockParams: IParams = {
                page: 1,
                size: 10,
                search: 'ford',
            };

            await serviceCars.count(mockParams);

            expect(mockRepoCars.count).toHaveBeenCalledWith(mockParams);
        });

        test('should return error if user is not set', async () => {
            const mockParams: IParams = {
                page: 1,
                size: 10,
                search: 'ford',
            };

            serviceCars.setUser = mockUser;

            expect(serviceCars.count(mockParams));
        });
    });
});
