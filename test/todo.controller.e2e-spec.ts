import { TestService } from './services/TestService';
import { HttpStatus } from '@nestjs/common';

const testService = new TestService();

describe('Todo Controller', () => {
    beforeAll(async () => {
        await testService.initializeTestingEnvironment();
    });

    beforeEach(async () => {
        await testService.truncateDatabase();
        await testService.registerUser();
    });

    it(`GET /api/tasks`, async () => {
        const { headers } = await testService.loginUser();

        const authCookies = headers['set-cookie'][0];

        const { status, body: tasks } = await testService.api.get('/api/tasks').set('Cookie', authCookies);

        expect(status).toEqual(HttpStatus.OK);
        expect(tasks).toEqual([]);
    });

    it(`POST /api/tasks`, async () => {
        const { headers, body: loggedUser } = await testService.loginUser();

        const authCookies = headers['set-cookie'][0];

        const { status, body: newTask } = await testService.api
            .post('/api/tasks')
            .send({ title: 'test', description: 'test' })
            .set('Cookie', authCookies);

        expect(status).toEqual(HttpStatus.CREATED);
        expect(newTask).toMatchObject({
            title: 'test',
            description: 'test',
            status: 'OPEN',
            user: {
                id: loggedUser.id
            }
        });
    });

    it(`GET /api/tasks/{id}`, async () => {
        const { headers } = await testService.loginUser();

        const authCookies = headers['set-cookie'][0];

        const { body: newTask } = await testService.api
            .post('/api/tasks')
            .send({ title: 'test', description: 'test' })
            .set('Cookie', authCookies);

        const { status, body: task } = await testService.api.get(`/api/tasks/${newTask.id}`).set('Cookie', authCookies);

        expect(status).toEqual(HttpStatus.OK);
        expect(task).toMatchObject({
            id: newTask.id,
            title: 'test',
            description: 'test',
            status: 'OPEN'
        });
    });

    it(`PATCH /api/tasks/{id}`, async () => {
        const { headers } = await testService.loginUser();

        const authCookies = headers['set-cookie'][0];

        const { body: newTask } = await testService.api
            .post('/api/tasks')
            .send({ title: 'test', description: 'test' })
            .set('Cookie', authCookies);

        const { status, body: updatedTask } = await testService.api
            .patch(`/api/tasks/${newTask.id}`)
            .send({ title: 'updated', description: 'updated', status: 'IN_PROGRESS' })
            .set('Cookie', authCookies);

        expect(status).toEqual(HttpStatus.OK);
        expect(updatedTask).toMatchObject({
            id: newTask.id,
            title: 'updated',
            description: 'updated',
            status: 'IN_PROGRESS'
        });
    });

    it(`DELETE /api/tasks/{id}`, async () => {
        const { headers } = await testService.loginUser();

        const authCookies = headers['set-cookie'][0];

        const { body: newTask } = await testService.api
            .post('/api/tasks')
            .send({ title: 'test', description: 'test' })
            .set('Cookie', authCookies);

        const { status } = await testService.api.delete(`/api/tasks/${newTask.id}`).set('Cookie', authCookies);

        expect(status).toEqual(HttpStatus.NO_CONTENT);

        const { status: deletedTaskResponseStatus } = await testService.api
            .get(`/api/tasks/${newTask.id}`)
            .set('Cookie', authCookies);

        expect(deletedTaskResponseStatus).toEqual(HttpStatus.NOT_FOUND);
    });
});
