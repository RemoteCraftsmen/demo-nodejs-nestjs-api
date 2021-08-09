import { LoginHandler } from './../services/Auth/LoginHandler';
import { LogoutController } from '../controllers/Auth/LogoutController';
import { RegisterController } from '../controllers/Auth/RegisterController';
import { LoginController } from '../controllers/Auth/LoginController';
import { UsersRepository } from '../repositories/UsersRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { RegisterHandler } from 'src/services/Auth/RegisterHandler';

@Module({
    imports: [TypeOrmModule.forFeature([UsersRepository])],
    controllers: [LoginController, RegisterController, LogoutController],
    providers: [LoginHandler, RegisterHandler]
})
export class AuthModule {}
