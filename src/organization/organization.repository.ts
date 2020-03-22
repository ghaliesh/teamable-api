import { EntityRepository, Repository } from "typeorm";
import { Organization } from "./organization.entity";
import { OrganizationDto } from "./organization.dto";
import { User } from "auth/user.entity";
import { NotFoundException } from "@nestjs/common";

@EntityRepository(Organization)
export class OrganizationRepository extends Repository<Organization> {
  async createOrganization(
    orgDto: OrganizationDto,
    user: User,
  ): Promise<Organization> {
    const org: Organization = new Organization(orgDto);
    org.owner = user;
    await org.save();
    return org;
  }

  async getOrganization(orgId: string, ownerId: string): Promise<Organization> {
    const organization: Organization = await this.findOne({
      id: orgId,
      ownerId,
    });
    if (!organization) throw new NotFoundException();
    return organization;
  }
}
