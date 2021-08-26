import { HttpStatus } from '@nestjs/common';

import { TestService } from '../../Bootstrap';
import { UserFactory } from '../../factories/user';

const testService = new TestService();
const userFactory = new UserFactory(testService);

let userData;


describe('Login Controller', () => {
    describe(`POST /api/auth/login`, () => {
        beforeAll(async () => {
            await testService.initializeTestingEnvironment();
            await testService.truncateDatabase();

            userData = userFactory.generate();
            await userFactory.create(userData);
        });

        it(`returns OK  passing valid data as NOT-LOGGED-IN`, async () => {
            const { status, body: loggedUser } = await testService.api.post('/api/auth/login').send({
                ...userData
            });

            expect(status).toEqual(HttpStatus.OK);
            expect(loggedUser).toHaveProperty('id');
        });

        it('returns UNAUTHORIZED sending invalid data as NOT-LOGGED-IN', async () => {
            userData.password='wrong_password';

            const { status, body: loggedUser } = await testService.api.post('/api/auth/login').send({
                ...userData
            });

            expect(status).toEqual(HttpStatus.UNAUTHORIZED);
        });
    });
});
