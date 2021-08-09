import { DeleteController } from '../controllers/User/DeleteController';
import { ShowController } from '../controllers/User/ShowController';
import { IndexController } from '../controllers/User/IndexController';
import { UsersService } from '../services/UsersService';
import { UsersRepository } from '../repositories/UsersRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { UpdateController } from 'src/controllers/User/UpdateController';

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository])],
    controllers: [IndexController, ShowController, UpdateController, DeleteController],
    providers: [UsersService]
})
export class UsersModule {}
