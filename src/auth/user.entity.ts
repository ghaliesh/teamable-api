import { BaseEntity, Entity, PrimaryGeneratedColumn } from "typeorm";
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
    this.name = userDto?.name;
    this.password = userDto?.password;
    this.email = userDto?.email;
  }
}
