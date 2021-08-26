import { HttpStatus } from '@nestjs/common';

import { TestService } from '../../Bootstrap';
import { UserFactory } from '../../factories/user';

const testService = new TestService();
const userFactory = new UserFactory(testService);

describe('Logout Controller', () => {
    beforeAll(async () => {
        await testService.initializeTestingEnvironment();
    });

    beforeEach(async () => {
        await testService.truncateDatabase();
    });

    it(`POST /api/auth/logout`, async () => {
        const userData = userFactory.generate();
        await userFactory.create(userData);

        await testService.api.post('/api/auth/login').send({
            ...userData
        });

        const { status } = await testService.api.get('/api/auth/logout');
        expect(status).toEqual(HttpStatus.OK);
    });

});
