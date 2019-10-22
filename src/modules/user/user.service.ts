import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(
        @Inject('USER_REPOSITORY')
        private readonly userRepository: Repository<User>
    ) {}

    async findAll(): Promise<User[]> {
        return await this.userRepository.find();
    }

    async find(id): Promise<User> {
        return await this.userRepository.findOne(id);
    }

    async update(id, data) {
        // @TODO: add return type
        await this.userRepository.update(id, data);

        return this.userRepository.find(id);
    }

    async delete(id) {
        // @TODO: add return type
        return await this.userRepository.delete(id);
    }
}
