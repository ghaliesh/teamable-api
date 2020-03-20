import { Injectable, Body, Post } from "@nestjs/common";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UserDto } from "./user.dto";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
  ) {}

  async signUp(userDto: UserDto): Promise<UserVm> {
    const result = await this.userRepository.createUser(userDto);
    return result;
  }
}
