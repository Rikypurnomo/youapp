import { IsEmail, IsNotEmpty, IsString, MinLength,Equals } from 'class-validator';

export class SignUpDto {

  @IsNotEmpty()
  @IsEmail({}, { message: 'Please enter correct email' })
  readonly email: string;

  @IsNotEmpty()
  @IsString()
  readonly userName: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  readonly password: string;

  @IsNotEmpty()
  @IsString()
  @Equals('password', { message: 'Passwords do not match' })
  readonly confirmPassword: string;
}