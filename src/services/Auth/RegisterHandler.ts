import { RegisterUserDto } from '@/dto/RegisterUserDto';
import { UsersRepository } from '@/repositories/UsersRepository';
import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from '@/entities/User';
import { InjectRepository } from '@nestjs/typeorm';

const bcrypt = require('bcryptjs');

@Injectable()
export class RegisterHandler {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ) {}

    async handle({ email, password }: RegisterUserDto): Promise<User> {
        const existingUser = await this.usersRepository.findOne({ email });

        if (existingUser) {
            throw new BadRequestException('User with that email already exist');
        }

        const hashedPassword = await bcrypt.hash(password, await bcrypt.genSalt());

        const user = this.usersRepository.create({ email, password: hashedPassword });

        await this.usersRepository.save(user);

        return this.usersRepository.findOne({ email });
    }
}
