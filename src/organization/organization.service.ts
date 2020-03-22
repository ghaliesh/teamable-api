import { Injectable } from "@nestjs/common";
import { OrganizationDto } from "./organization.dto";
import { Organization } from "./organization.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { OrganizationRepository } from "./organization.repository";
import { User } from "auth/user.entity";

@Injectable()
export class OrganizationService {
  constructor(
    @InjectRepository(Organization)
    private orgRepository: OrganizationRepository,
  ) {}

  async createOrganization(
    orgDto: OrganizationDto,
    user: User,
  ): Promise<Organization> {
    const orgniazation: Organization = await this.orgRepository.createOrganization(
      orgDto,
      user,
    );
    return orgniazation;
  }

  async getOrganization(orgId: string, ownerId: string): Promise<Organization> {
    const organization: Organization = await this.orgRepository.getOrganization(
      orgId,
      ownerId,
    );
    return organization;
  }
}
