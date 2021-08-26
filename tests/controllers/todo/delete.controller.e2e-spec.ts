import { HttpStatus } from '@nestjs/common';

import { TestService } from '../../Bootstrap';
import { UserFactory } from '../../factories/user';

const testService = new TestService();
const userFactory = new UserFactory(testService);

describe('Delete Todo Controller', () => {
    describe(`DELETE /api/tasks/{id}`, () => {
        beforeAll(async () => {
            await testService.initializeTestingEnvironment();
        });

        beforeEach(async () => {
            await testService.truncateDatabase();
        });

        it(`returns NO_CONTENT deleting TODO as USER`, async () => {
            const userData = userFactory.generate();
            await userFactory.create(userData);

            await testService.api.post('/api/auth/login').send({
                ...userData
            });

            const { body: newTask } = await testService.api
                .post('/api/tasks')
                .send({ title: 'test', description: 'test' });
        
            const { status } = await testService.api.delete(`/api/tasks/${newTask.id}`);

            expect(status).toEqual(HttpStatus.NO_CONTENT);

            const { status: deletedTaskResponseStatus } = await testService.api
                .get(`/api/tasks/${newTask.id}`);

            expect(deletedTaskResponseStatus).toEqual(HttpStatus.NOT_FOUND);
        });

        it(`returns NO_CONTENT deleting non-existing TODO as USER`, async () => {
            const userData = userFactory.generate();
            await userFactory.create(userData);

            await testService.api.post('/api/auth/login').send({
                ...userData
            });

            const { status } = await testService.api.delete(`/api/tasks/task_does_not_exist`);

            expect(status).toEqual(HttpStatus.NO_CONTENT);
        });

        /*ToDo
            it("returns FORBIDDEN deleting someone else's task as USER", async () => {
         */
    });
});