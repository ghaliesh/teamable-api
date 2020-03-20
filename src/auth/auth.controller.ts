import { Controller, Get, Post, Body } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { User } from "./user.entity";
import { AuthService } from "./auth.service";

@Controller("auth")
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
