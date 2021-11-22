import { Module } from '@nestjs/common';

import { PersonModule } from "./person/person.module";
import { BookModule } from "./book/book.module";

@Module({
  imports: [ PersonModule, BookModule ],
  controllers: [],
  providers: [],
})
export class AppModule {}
