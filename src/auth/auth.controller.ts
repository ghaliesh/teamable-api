import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  HttpException,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { UserDto } from "./user.dto";
import { HttpExceptionFilter } from "error-handler";

@Controller("auth")
@UseFilters(new HttpExceptionFilter())
export class AuthController {
  constructor(private userService: AuthService) {}

  @Get()
  test(): string {
    return "Test";
  }

  @Post("signup")
  async signup(@Body() userDto: UserDto): Promise<UserVm> {
    const user: UserVm = await this.userService.signUp(userDto);
    return user;
  }
}
