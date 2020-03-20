import typeormConfig from "config/typeorm.config";

import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [TypeOrmModule.forRoot(typeormConfig), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
