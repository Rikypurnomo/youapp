import { Body, Controller, Get, Post,UploadedFile, UseInterceptors,Param,NotFoundException,Put ,UseGuards,} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { UserProfileDto } from './dto/userprofile.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() signUpDto: SignUpDto): Promise<{ message: string }> {
    return this.authService.signUp(signUpDto);
  }

  @Get('/login')
  login(@Body() loginDto: LoginDto): Promise<{s: string, token: string }> {
    return this.authService.login(loginDto);
  }
  
  @Post('/profile')
  @UseGuards(AuthGuard())
@UseInterceptors(FileInterceptor('profilePicture'))
async profile(@UploadedFile() file, @Body() userProfileDto: UserProfileDto) {
  if (file) {
    userProfileDto.profilePicture = file.filename;
  }

  await this.authService.profile(userProfileDto);

  return { message: 'Profil berhasil dibuat' };
}

@Get('/getprofile/:Id')
async getUserProfile(@Param('Id') userId: string) {
  const userProfile = await this.authService.getUserProfileById(userId);

  if (!userProfile) {
    throw new NotFoundException('Profil tidak ditemukan');
  }

  return userProfile;
}

@Put('/editprofile/:id')
async editUserProfile(
  @Param('id') userId: string,
  @Body() updatedProfile: UserProfileDto,
) {
  const updatedUserProfile = await this.authService.editProfile(userId, updatedProfile);

  if (!updatedUserProfile) {
    throw new NotFoundException('Profil tidak ditemukan');
  }

  return { message: 'Profil berhasil diperbarui', updatedUserProfile };
}

}

  // @Post('/profile')
  // profile(@Body()userprofiledto:UserProfileDto): Promise<{p: string}> {
  //   return this.authService.profile(userprofiledto)
  // }
// }