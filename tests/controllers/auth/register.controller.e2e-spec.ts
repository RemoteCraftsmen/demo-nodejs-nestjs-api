import { HttpStatus } from '@nestjs/common';

import { TestService } from '../../Bootstrap';


const testService = new TestService();


describe('Register Controller', () => {
    beforeAll(async () => {
        await testService.initializeTestingEnvironment();
    });

    beforeEach(async () => {
        await testService.truncateDatabase();
    });

    it(`POST /api/auth/register`, async () => {
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
});
