import config from "config";

import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";

const dbOptions: TypeOrmModuleOptions = config.get("db");

@Module({
  imports: [TypeOrmModule.forRoot(dbOptions), AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
