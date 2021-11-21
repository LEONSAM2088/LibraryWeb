import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
require('dotenv').config({path:__dirname+'../.env'})

const start = async () => {
  try {

    const PORT = process.env.PORT || 3000;
    const app = await NestFactory.create(AppModule);

    await app.listen(PORT, () => console.log(`Server has been started on PORT ${PORT}!`));
  }
  catch (e) {
    console.log(e);
  }
}
start();