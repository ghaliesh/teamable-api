import {
  Body,
  Controller,
  Get,
  Post,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";

import { AuthService } from "./auth.service";
import { UserDto } from "./user.dto";
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
}
