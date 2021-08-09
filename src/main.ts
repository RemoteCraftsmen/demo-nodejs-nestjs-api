import { useCors } from './plugins/cors';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './AppModule';
import { useSession } from './plugins/session';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe());

    useCors(app);
    useSession(app);

    await app.listen(3000);
}

bootstrap();
