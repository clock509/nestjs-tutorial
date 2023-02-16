import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CatsV1Controller, CatsV2Controller } from './cats/cats.controller';
import { DogsController } from './dogs/dogs.controller';
// import { V1Controller } from './v1/v1.controller';
// import { V2Controller } from './v2/v2.controller';

@Module({
  imports: [],
  controllers: [
    AppController,
    CatsV1Controller,
    CatsV2Controller,
    DogsController,
  ],
  providers: [AppService],
})
export class AppModule {}
