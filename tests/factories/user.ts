import * as faker from 'faker';

import { TestService } from "../Bootstrap";
import { RegisterHandler } from "@/services/Auth/RegisterHandler";


export class UserFactory {
    constructor(
        private testService: TestService
    ) 
    {}

    generate(){
        return  {
            email: faker.internet.email(),
            password: faker.internet.password()
        };
    }

    create = async (props) =>  {
        const email= props.email;
        const password= props.password;

        const registerHandler = this.testService.app.get<RegisterHandler>(RegisterHandler);

        return registerHandler.handle({email, password,passwordRepeat:password});
    }
}