import { PassportStrategy } from "@nestjs/passport";

import { Strategy, ExtractJwt } from "passport-jwt";
import { Injectable } from "@nestjs/common";
import * as config from "config";
import { InjectRepository } from "@nestjs/typeorm";
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
}
