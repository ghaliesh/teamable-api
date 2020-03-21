import {
  BaseEntity,
  Entity,
  PrimaryGeneratedColumn,
  Unique,
  Column,
} from "typeorm";
import { UserDto } from "./user.dto";

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

  constructor(userDto: UserDto) {
    super();
    this.name = userDto?.name;
    this.password = userDto?.password;
    this.email = userDto?.email;
  }
}
