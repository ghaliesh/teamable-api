import { Module } from "@nestjs/common";
import { OrganizationController } from "./organization.controller";
import { OrganizationService } from "./organization.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { OrganizationRepository } from "./organization.repository";

@Module({
  controllers: [OrganizationController],
  providers: [OrganizationService],
  imports: [TypeOrmModule.forFeature([OrganizationRepository])],
})
export class OrganizationModule {}
