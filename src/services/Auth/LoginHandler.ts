import { UsersRepository } from '../../repositories/UsersRepository';
import { AuthCredentialsDto } from '../../dto/AuthCredentialsDto';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { User } from '../../entities/User';
import { InjectRepository } from '@nestjs/typeorm';

const bcrypt = require('bcryptjs');

@Injectable()
export class LoginHandler {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ) {}

    async handle({ email, password }: AuthCredentialsDto): Promise<User> {
        const user = await this.usersRepository
            .createQueryBuilder('user')
            .andWhere('user.email = :email', { email })
            .addSelect('user.password')
            .getOne();

        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new UnauthorizedException();
        }

        return this.usersRepository.findOne({ email });
    }
}
