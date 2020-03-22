import {
  BaseEntity,
  PrimaryGeneratedColumn,
  Column,
  Entity,
  ManyToOne,
} from "typeorm";
import { OrganizationDto } from "./organization.dto";
import { User } from "auth/user.entity";

@Entity()
export class Organization extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: string;

  @Column()
  name: string;

  @Column({ nullable: true, default: "" })
  description: string;

  @ManyToOne(
    _type => User,
    user => user.organizations,
    { eager: false },
  )
  owner: User;

  constructor(dto: OrganizationDto) {
    super();
    this.name = dto?.name;
    this.description = dto?.description;
  }
}
