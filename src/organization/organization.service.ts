import { Injectable } from "@nestjs/common";
import { OrganizationDto } from "./organization.dto";
import { Organization } from "./organization.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { OrganizationRepository } from "./organization.repository";

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private orgRepository: OrganizationRepository,
  ) {}

  async createOrganization(orgDto: OrganizationDto): Promise<Organization> {
    const orgniazation: Organization = await this.orgRepository.createOrganization(
      orgDto,
    );
    return orgniazation;
  }
}
