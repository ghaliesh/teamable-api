import { IsNotEmpty, MaxLength, MinLength } from "class-validator";

export class OrganizationDto {
  @IsNotEmpty()
  @MaxLength(20)
  @MinLength(2)
  name: string;

  description: string;
}
