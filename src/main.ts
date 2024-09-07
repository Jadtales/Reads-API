import {NestFactory} from "@nestjs/core";
import {AppModule} from './app.module';
import {ValidationPipe} from "@nestjs/common";

async function app() {
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true, transform: true}));
    await app.listen(3002);
}

app();
