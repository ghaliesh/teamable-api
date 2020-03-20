import { BaseEntity, Entity, PrimaryGeneratedColumn, Unique } from "typeorm";
import { UserDto } from "./user.dto";

@Entity()
export class User extends BaseEntity {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  name: string;

  email: string;

  password: string;

  constructor(userDto: UserDto) {
    super();
    const { name, password, email } = userDto;
    this.name = name;
    this.password = password;
    this.email = email;
  }
}
