import { UpdateUserDto } from '../dto/UpdateUserDto';
import { InjectRepository } from '@nestjs/typeorm';
import { UsersRepository } from '../repositories/UsersRepository';
import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from '../entities/User';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UsersRepository)
        private usersRepository: UsersRepository
    ) {}

    findAll(): Promise<User[]> {
        return this.usersRepository.find();
    }

    async findOne(id: string): Promise<User> {
        const user = await this.usersRepository.findOne(id);

        if (!user) {
            throw new NotFoundException();
        }

        return user;
    }

    async update(id: string, { email }: UpdateUserDto): Promise<User> {
        const user = await this.usersRepository.findOne(id);

        if (!user) {
            throw new NotFoundException();
        }

        await this.usersRepository.update(id, { email });

        return this.usersRepository.findOne(id);
    }

    delete(id: string): void {
        this.usersRepository.delete(id);
    }
}
