import { HttpStatus } from '@nestjs/common';
import { TestService } from '../../Bootstrap';


const testService = new TestService();

describe('Register Controller', () => {
    describe('POST /register', () => {
        beforeAll(async () => {
            await testService.initializeTestingEnvironment();
        });

        beforeEach(async () => {
            await testService.truncateDatabase();
        });

        it(`returns CREATED  passing valid data as NOT-LOGGED-IN`, async () => {
            const userData = {
                email: 'register@example.com',
                password: 'somePassword'
            };

            const { status, body: registeredUser } = await testService.api.post('/api/auth/register').send({
                ...userData,
                passwordRepeat: userData.password
            });

            expect(status).toEqual(HttpStatus.CREATED);
            expect(registeredUser).toHaveProperty('id');
        });
        /* ToDo improve it
            it(`returns BAD_REQUEST  passing no data as NOT-LOGGED-IN`, async () => {
            it(`returns BAD_REQUEST  passing wrong data as NOT-LOGGED-IN`, async () => {
        */
    });
});
