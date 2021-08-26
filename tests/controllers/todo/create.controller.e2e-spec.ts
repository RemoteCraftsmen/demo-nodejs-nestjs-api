import { HttpStatus } from '@nestjs/common';

import { TestService } from '../../Bootstrap';
import { UserFactory } from '../../factories/user';

const testService = new TestService();
const userFactory = new UserFactory(testService);

let userData;

describe('Create Todo Controller', () => {
    beforeAll(async () => {
        await testService.initializeTestingEnvironment();
        await testService.truncateDatabase();

        userData = userFactory.generate();
        await userFactory.create(userData);
    });


    it(`POST /api/tasks`, async () => {
        const { body: loggedUser } = await testService.api.post('/api/auth/login').send({
            ...userData
        });
        
        const { status, body: newTask } = await testService.api
            .post('/api/tasks')
            .send({ title: 'test', description: 'test' });

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

    /* ToDo implement
        it('returns BAD_REQUEST sending no data as USER', async () => {
    */

});