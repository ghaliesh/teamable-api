import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import * as config from "config";

import { TypeOrmModuleOptions } from "@nestjs/typeorm";

const dbOptions: TypeOrmModuleOptions = config.get("db");

@Module({
  imports: [TypeOrmModule.forRoot(dbOptions), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
