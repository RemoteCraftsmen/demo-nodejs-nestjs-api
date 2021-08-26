import { HttpStatus } from '@nestjs/common';

import { TestService } from '../../Bootstrap';
import { UserFactory } from '../../factories/user';


const testService = new TestService();
const userFactory = new UserFactory(testService);


describe('Show Todo Controller', () => {
    describe('GET /api/tasks/{id}', () => {
            beforeAll(async () => {
            await testService.initializeTestingEnvironment();
        });

        beforeEach(async () => {
            await testService.truncateDatabase();
        });

        it(`returns OK when TODO exists as USER`, async () => {
            const userData = userFactory.generate();
            await userFactory.create(userData);

        
            await testService.api.post('/api/auth/login').send({
                ...userData
            });

            const { body: newTask } = await testService.api
                .post('/api/tasks')
                .send({ title: 'test', description: 'test' });

            const { status, body: task } = await testService.api.get(`/api/tasks/${newTask.id}`);

            expect(status).toEqual(HttpStatus.OK);
            expect(task).toMatchObject({
                id: newTask.id,
                title: 'test',
                description: 'test',
                status: 'OPEN'
            });
        });

        it(`returns NOT_FOUND if todo doesn't exist as USER`, async () => {
            const userData = userFactory.generate();
            await userFactory.create(userData);

            await testService.api.post('/api/auth/login').send({
                ...userData
            });

            const { body: newTask } = await testService.api
                .post('/api/tasks')
                .send({ title: 'test', description: 'test' });

            const { status, body: task } = await testService.api.get(`/api/tasks/task_does_not_exist`);

            expect(status).toEqual(HttpStatus.NOT_FOUND);
        });
        /*Todo
            it('returns NOT_FOUND if belongs to another user as USER', async () => {
            it('returns FORBIDDEN  as Not Logged in', async () => {

         */
    });
});