import { Repository } from "typeorm";

import { UserDto } from "./user.dto";
import { User } from "./user.entity";

export class UserRepository extends Repository<User> {
  async createUser(userDto: UserDto): Promise<User> {
    const user: User = new User(userDto);
    await user.save();
    delete user.password;
    return user;
  }
}
