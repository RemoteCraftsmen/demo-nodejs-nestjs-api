import { TestService } from '../Bootstrap';
import { HttpStatus } from '@nestjs/common';

const testService = new TestService();

describe('Auth Controller', () => {
    beforeAll(async () => {
        await testService.initializeTestingEnvironment();
    });

    beforeEach(async () => {
        await testService.truncateDatabase();
    });

    it(`POST /api/auth/register`, async () => {
        const { status, body: registeredUser } = await testService.registerUser();

        expect(status).toEqual(HttpStatus.CREATED);
        expect(registeredUser).toHaveProperty('id');
    });

    it(`POST /api/auth/login`, async () => {
        await testService.registerUser();

        const { status, body: loggedUser } = await testService.loginUser();

        expect(status).toEqual(HttpStatus.OK);
        expect(loggedUser).toHaveProperty('id');
    });

    it(`POST /api/auth/logout`, async () => {
        await testService.registerUser();

        const { headers } = await testService.loginUser();

        const authCookies = headers['set-cookie'][0];

        const { status } = await testService.logoutUser().set('Cookie', authCookies);

        expect(status).toEqual(HttpStatus.OK);
    });
});
