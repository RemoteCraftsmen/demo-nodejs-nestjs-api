import { HttpStatus } from '@nestjs/common';

import { TestService } from '../../Bootstrap';
import { UserFactory } from '../../factories/user';

const testService = new TestService();
const userFactory = new UserFactory(testService);

describe('Index Todo Controller', () => {
    beforeAll(async () => {
        await testService.initializeTestingEnvironment();
    });

    beforeEach(async () => {
        await testService.truncateDatabase();
    });

    it(`GET /api/tasks`, async () => {
        const userData = userFactory.generate();
        await userFactory.create(userData);

        await testService.api.post('/api/auth/login').send({
            ...userData
        });

        const { status, body: tasks } = await testService.api.get('/api/tasks');

        expect(status).toEqual(HttpStatus.OK);
        expect(tasks).toEqual([]);
    });
});