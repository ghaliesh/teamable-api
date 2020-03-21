import { Repository, EntityRepository } from "typeorm";
import { deleteProperty } from "utils";

import { UserDto } from "./user.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
  async createUser(userDto: UserDto): Promise<UserVm> {
    const user: User = new User(userDto);
    await user.save();
    const result: UserVm = this.mapper(user);
    return result;
  }

  private mapper(user: User): UserVm {
    const result: UserVm = deleteProperty(user, "password");
    return result;
  }
}
