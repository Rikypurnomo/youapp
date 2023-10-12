import { IsNotEmpty, IsString, IsEnum, IsDateString } from 'class-validator';
enum Gender {
    Male = "male",
    Female = "female",
  }

export class UpdateProfileDto {
  @IsString()
  profilePicture: string;

  @IsNotEmpty()
  @IsString()
  displayName: string;

  @IsNotEmpty()
  @IsEnum(Gender)
  gender: Gender;

  @IsDateString()
  birthday: Date;

  @IsString()
  horoscope: string;

  @IsString()
  zodiac: string;

  @IsString()
  height: string;

  @IsString()
  weight: string;
}
