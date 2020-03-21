import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { PassportModule } from "@nestjs/passport";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtStrategy } from "./jwt-strategy";
import { UserRepository } from "./user.repository";
import * as config from "config";

const secret: string = config.get("security.jwt.secret");

@Module({
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy],
  imports: [
    TypeOrmModule.forFeature([UserRepository]),
    PassportModule.register({ defaultStrategy: "jwt" }),
    JwtModule.register({ secret }),
  ],
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
