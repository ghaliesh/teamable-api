import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  Column,
  OneToMany,
} from "typeorm";
import { UserDto } from "./user.dto";
import { Organization } from "organization/organization.entity";

@Entity()
@Unique(["email"])
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @OneToMany(
    () => Organization,
    organiaztion => organiaztion.owner,
    { eager: true },
  )
  organizations: Organization[];

  constructor(userDto: UserDto) {
    super();
    this.name = userDto?.name;
    this.password = userDto?.password;
    this.email = userDto?.email;
  }
}
