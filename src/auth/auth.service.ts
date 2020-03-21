import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserDto } from "./user.dto";
import { hash, compare, genSalt } from "bcrypt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import * as config from "config";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async signUp(userDto: UserDto): Promise<UserVm> {
    const password: string = await this.hashPassword(userDto.password);
    const dto: UserDto = { ...userDto, password };
    const result = await this.userRepository.createUser(dto);
    return result;
  }

  async hashPassword(password: string): Promise<string> {
    const saltVal: number = config.get("security.jwt.salt");
    const salt: string = await genSalt(saltVal);
    const hashed = await hash(password, salt);
    return hashed;
  }
}
