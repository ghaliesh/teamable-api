import { BaseEntity, PrimaryGeneratedColumn, Column } from "typeorm";
import { OrganizationDto } from "./organization.dto";

export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true, default: "" })
  description: string;

  constructor(dto: OrganizationDto) {
    super();
    this.name = dto.name;
    this.description = dto.description;
  }
}
