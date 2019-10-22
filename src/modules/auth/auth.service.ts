import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from '../user/user.entity';

const bcrypt = require('bcryptjs');

@Injectable()
export class AuthService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<User>
    ) {}

    async login(email: string, password: string) {
        const user = await this.userRepository.findOne({
            email
        });

        if (!user) {
            throw new Error('No user with the given email address');
        }

        const match = bcrypt.compareSync(password, user.password);

        if (!match) {
            throw new Error('Invalid username or password');
        }

        return user;
    }

    async register(email: string, password: string) {
        const existingUser = await this.userRepository.findOne({ email });

        if (existingUser) {
            throw new Error('User with this email address already exists');
        }

        const encryptedPassword = bcrypt.hashSync(password);
        const user = await this.userRepository.save({ email, password: encryptedPassword });

        if (!user) {
            throw new Error('User could not be created');
        }

        return user;
    }

    truncate() {
        return this.userRepository.clear();
    }
}
