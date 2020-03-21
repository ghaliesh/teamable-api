import { compare, genSalt, hash } from "bcrypt";
import * as config from "config";
import { getMessage } from "utils";

import { BadRequestException, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { InjectRepository } from "@nestjs/typeorm";

import { SignInDto, UserDto } from "./user.dto";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(userDto: UserDto): Promise<UserVm> {
    const password: string = await this.hashPassword(userDto.password);
    const dto: UserDto = { ...userDto, password };
    const result = await this.userRepository.createUser(dto);
    return result;
  }

  async signIn(signInDto: SignInDto): Promise<SignInVm> {
    const { email, password } = signInDto;
    const user: User = await this.userRepository.getByEmail(email);
    const errorMsg: string = getMessage("errors.auth.invalidCreds");
    if (!user) throw new BadRequestException(errorMsg);
    const { password: hashed } = user;
    const validCreds: boolean = await this.validateCreds(password, hashed);
    if (!validCreds) {
      throw new BadRequestException(errorMsg);
    }
    const accessToken = await this.jwtService.signAsync(user.id);
    return { accessToken };
  }

  async hashPassword(password: string): Promise<string> {
    const saltVal: number = config.get("security.jwt.salt");
    const salt: string = await genSalt(saltVal);
    const hashed = await hash(password, salt);
    return hashed;
  }

  async validateCreds(password: string, hash: string): Promise<boolean> {
    const valid: boolean = await compare(password, hash);
    return valid;
  }
}
