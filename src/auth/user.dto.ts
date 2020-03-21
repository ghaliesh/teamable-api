import {
  MaxLength,
  MinLength,
  IsEmail,
  Matches,
  IsNotEmpty,
} from "class-validator";

import { PASSWORD_REGEX, getMessage } from "utils";

export class UserDto {
  @MaxLength(20)
  @MinLength(2)
  @IsNotEmpty()
  name: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  @Matches(PASSWORD_REGEX, {
    message: getMessage("errors.auth.weakPassword"),
  })
  password: string;
}

export class SignInDto {
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsNotEmpty()
  password: string;
}
