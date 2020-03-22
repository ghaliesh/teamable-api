import {
  Body,
  Controller,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { UserDto, SignInDto } from "./user.dto";
import { DataBaseExceptionFilter, UnAuthorizedExceptionFilter } from "errors";
import { AuthGuard } from "@nestjs/passport";

@Controller("auth")
@UseFilters(new DataBaseExceptionFilter())
@UseFilters(new UnAuthorizedExceptionFilter())
export class AuthController {
  constructor(private userService: AuthService) {}

  @UsePipes(ValidationPipe)
  @Post("signup")
  async signup(@Body() userDto: UserDto): Promise<UserVm> {
    const user: UserVm = await this.userService.signUp(userDto);
    return user;
  }

  @UsePipes(ValidationPipe)
  @Post("signin")
  async signin(@Body() signInDto: SignInDto): Promise<SignInVm> {
    const result: SignInVm = await this.userService.signIn(signInDto);
    return result;
  }
}
