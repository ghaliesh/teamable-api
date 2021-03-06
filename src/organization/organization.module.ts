import { Module } from "@nestjs/common";
import { OrganizationController } from "./organization.controller";
import { OrganizationService } from "./organization.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganizationRepository } from "./organization.repository";
import { AuthModule } from "auth/auth.module";

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
  imports: [AuthModule, TypeOrmModule.forFeature([OrganizationRepository])],
})
export class OrganizationModule {}
