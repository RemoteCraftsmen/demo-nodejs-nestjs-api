import { HttpStatus } from '@nestjs/common';

import { TestService } from '../../Bootstrap';
import { UserFactory } from '../../factories/user';

const testService = new TestService();
const userFactory = new UserFactory(testService);

describe('Login Controller', () => {
    beforeAll(async () => {
        await testService.initializeTestingEnvironment();
    });

    beforeEach(async () => {
        await testService.truncateDatabase();
    });

    it(`POST /api/auth/login`, async () => {
        const userData = await userFactory.generate();

        await userFactory.create(userData);

        const { status, body: loggedUser } = await testService.api.post('/api/auth/login').send({
            ...userData
        });

        expect(status).toEqual(HttpStatus.OK);
        expect(loggedUser).toHaveProperty('id');
    });

});
