import {
  Controller,
  Post,
  Body,
  ValidationPipe,
  UsePipes,
  UseGuards,
} from "@nestjs/common";
import { GetUser } from "auth/user.decorator";
import { OrganizationDto } from "./organization.dto";
import { Organization } from "./organization.entity";
import { OrganizationService } from "./organization.service";
import { User } from "auth/user.entity";
import { AuthGuard } from "@nestjs/passport";

@Controller("organization")
@UseGuards(AuthGuard())
@UsePipes(ValidationPipe)
export class OrganizationController {
  constructor(private orgService: OrganizationService) {}

  @Post("/create")
  async createOrganization(
    @Body() organization: OrganizationDto,
    @GetUser() user: User,
  ): Promise<Organization> {
    const org = await this.orgService.createOrganization(organization, user);
    return org;
  }
}
