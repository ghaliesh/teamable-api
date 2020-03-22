import { PassportStrategy } from "@nestjs/passport";
import { getDate } from "date-fns";
import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable, UnauthorizedException } from "@nestjs/common";
import * as config from "config";
import { InjectRepository } from "@nestjs/typeorm";
import { UserRepository } from "./user.repository";
import { User } from "./user.entity";

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
