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

    it(`GET /api/tasks/{id}`, async () => {
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
});