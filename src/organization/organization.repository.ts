import { EntityRepository, Repository } from "typeorm";
import { Organization } from "./organization.entity";
import { OrganizationDto } from "./organization.dto";

@EntityRepository(Organization)
export class OrganizationRepository extends Repository<Organization> {
  async createOrganization(orgDto: OrganizationDto): Promise<Organization> {
    const org: Organization = new Organization(orgDto);
    await org.save();
    return org;
  }
}
