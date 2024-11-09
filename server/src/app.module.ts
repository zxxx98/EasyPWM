import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { CloudService } from './cloud.service';
import { CloudController } from './cloud.controller';

@Module({
  imports: [],
  controllers: [AppController, UserController, CloudController],
  providers: [AppService, UserService, CloudService],
})
export class AppModule { }
