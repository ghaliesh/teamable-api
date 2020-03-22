import { BaseEntity, PrimaryGeneratedColumn, Column, Entity } from "typeorm";
import { OrganizationDto } from "./organization.dto";

@Entity()
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true, default: "" })
  description: string;

  constructor(dto: OrganizationDto) {
    super();
    this.name = dto?.name;
    this.description = dto?.description;
  }
}
