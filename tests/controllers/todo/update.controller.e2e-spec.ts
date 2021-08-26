import { HttpStatus } from '@nestjs/common';

import { TestService } from '../../Bootstrap';
import { UserFactory } from '../../factories/user';

const testService = new TestService();
const userFactory = new UserFactory(testService);


describe('Show Todo Controller', () => {
    beforeAll(async () => {
        await testService.initializeTestingEnvironment();
    });

    beforeEach(async () => {
        await testService.truncateDatabase();
    });

    it(`PATCH /api/tasks/{id}`, async () => {
        const userData = userFactory.generate();
        await userFactory.create(userData);

        await testService.api.post('/api/auth/login').send({
            ...userData
        });

        const { body: newTask } = await testService.api
            .post('/api/tasks')
            .send({ title: 'test', description: 'test' });

        const { status, body: updatedTask } = await testService.api
            .patch(`/api/tasks/${newTask.id}`)
            .send({ title: 'updated', description: 'updated', status: 'IN_PROGRESS' });

        expect(status).toEqual(HttpStatus.OK);
        expect(updatedTask).toMatchObject({
            id: newTask.id,
            title: 'updated',
            description: 'updated',
            status: 'IN_PROGRESS'
        });
    });
});