import { Controller, Post, Body } from "@nestjs/common";
import { OrganizationDto } from "./organization.dto";
import { Organization } from "./organization.entity";
import { OrganizationService } from "./organization.service";

@Controller("organization")
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
