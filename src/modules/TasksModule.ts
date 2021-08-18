import { ShowController } from '@/controllers/Task/ShowController';
import { CreateController } from '@/controllers/Task/CreateController';
import { TasksService } from '@/services/TasksService';
import { TasksRepository } from '@/repositories/TasksRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { IndexController } from '@/controllers/Task/IndexController';
import { UpdateController } from '@/controllers/Task/UpdateController';
import { DeleteController } from '@/controllers/Task/DeleteController';

@Module({
    imports: [TypeOrmModule.forFeature([TasksRepository])],
    controllers: [IndexController, CreateController, ShowController, UpdateController, DeleteController],
    providers: [TasksService]
})
export class TasksModule {}
