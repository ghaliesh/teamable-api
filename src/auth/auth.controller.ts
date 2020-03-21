import {
  Body,
  Controller,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { UserDto, SignInDto } from "./user.dto";
import { DataBaseExceptionFilter } from "errors";

@Controller("auth")
@UseFilters(new DataBaseExceptionFilter())
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
  async signin(@Body() signInDto: SignInDto): Promise<{ accessToken: string }> {
    const result: { accessToken: string } = await this.userService.signIn(
      signInDto,
    );
    return result;
  }
}
