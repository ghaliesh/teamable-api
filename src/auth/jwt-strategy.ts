import * as config from "config";
import { ExtractJwt, Strategy } from "passport-jwt";

import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";

import { User } from "./user.entity";
import { UserRepository } from "./user.repository";

const secret: string = config.get("security.jwt.secret");

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserRepository) private userRepository: UserRepository,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: secret,
    });
  }

  async validate(payalod: TokenPayload): Promise<User> {
    const user: User = await this.userRepository.findOne(payalod.id);
    return user;
  }
}
