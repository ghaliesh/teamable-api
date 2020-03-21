import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";

import { UserDto, SignInDto } from "./user.dto";
import { hash, compare, genSalt } from "bcrypt";
import { User } from "./user.entity";
import { UserRepository } from "./user.repository";
import * as config from "config";
import { JwtService } from "@nestjs/jwt";

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

  async signIn(signInDto: SignInDto): Promise<{ accessToken: string }> {
    const { email, password } = signInDto;
    const user: User = await this.userRepository.getByEmail(email);
    if (!user) throw new NotFoundException("Didn't found the user");
    const validCreds: boolean = await this.validateCreds(
      password,
      user.password,
    );
    if (!validCreds)
      throw new BadRequestException(
        "The creds didn't match any of our records",
      );
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
