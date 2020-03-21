import { MaxLength, MinLength, IsEmail, Matches } from "class-validator";

import { PASSWORD_REGEX } from "utils";

export class UserDto {
  @MaxLength(20)
  @MinLength(2)
  name: string;

  @IsEmail()
  email: string;

  @Matches(PASSWORD_REGEX)
  password: string;
}
