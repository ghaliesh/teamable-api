import * as config from "config";

import { Module } from "@nestjs/common";
import { TypeOrmModule, TypeOrmModuleOptions } from "@nestjs/typeorm";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { OrganizationModule } from './organization/organization.module';

const dbOptions: TypeOrmModuleOptions = config.get("db");

@Module({
  imports: [TypeOrmModule.forRoot(dbOptions), AuthModule, OrganizationModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
