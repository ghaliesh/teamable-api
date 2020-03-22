import { EntityRepository, Repository } from "typeorm";
import { Organization } from "./organization.entity";
import { OrganizationDto } from "./organization.dto";
import { User } from "auth/user.entity";

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
}
