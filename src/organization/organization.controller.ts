import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
} from "@nestjs/common";
import { OrganizationDto } from "./organization.dto";
import { Organization } from "./organization.entity";
import { OrganizationService } from "./organization.service";

@Controller("organization")
@UsePipes(ValidationPipe)
export class OrganizationController {
  constructor(private orgService: OrganizationService) {}

  @Post("/create")
  async createOrganization(
    @Body() organization: OrganizationDto,
  ): Promise<Organization> {
    const org = await this.orgService.createOrganization(organization);
    return org;
  }
}
