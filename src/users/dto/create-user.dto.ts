import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsString, Length } from "class-validator";

export class CreateUserDto {
  @ApiProperty({ example: "example@mail.com", description: "User email" })
  @IsString({ message: "Should be always String" })
  @IsEmail({}, { message: "Incorrect email" })
  readonly email: string;

  @ApiProperty({ example: "123qwerty", description: "User password" })
  @IsString({ message: "Should be always String" })
  @Length(4, 16, { message: "Not less 4, not more then 16" })
  readonly password: string;
}
