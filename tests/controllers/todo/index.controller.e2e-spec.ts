import { HttpStatus } from '@nestjs/common';

import { TestService } from '../../Bootstrap';
import { UserFactory } from '../../factories/user';

const testService = new TestService();
const userFactory = new UserFactory(testService);

describe('Index Todo Controller', () => {
    describe('GET /api/tasks', () => {
        beforeAll(async () => {
            await testService.initializeTestingEnvironment();
        });

        beforeEach(async () => {
            await testService.truncateDatabase();
        });

        it(`returns OK with all todos that belongs to user as USER`, async () => {
            //ToDo add tasks and check if it returns all tasks that belong to user
            const userData = userFactory.generate();
            await userFactory.create(userData);

            await testService.api.post('/api/auth/login').send({
                ...userData
            });

            const { status, body: tasks } = await testService.api.get('/api/tasks');

            expect(status).toEqual(HttpStatus.OK);
            expect(tasks).toEqual([]);
        });
/*ToDo
        it(`returns UNAUTHORIZED as NOT-LOGGED-IN`, async () => {

            await testService.api.post('/api/auth/logout');
            const { status, body: tasks } = await testService.api.get('/api/tasks');

            expect(status).toEqual(HttpStatus.OK);
            expect(tasks).toEqual([]);
        });

 */
    });
});