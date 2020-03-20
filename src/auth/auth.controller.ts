import { Controller, Get, Post } from "@nestjs/common";
import { UserDto } from "./user.dto";
import { User } from "./user.entity";

@Controller("auth")
export class AuthController {
  @Get()
  test(): string {
    return "Test";
  }

  @Post("signup")
  async signup(userDto: UserDto): Promise<User> {
    return new User(userDto);
  }
}
