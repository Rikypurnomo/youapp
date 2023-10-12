import { BadRequestException, Injectable, UnauthorizedException,NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User,UserProfile } from './schemas/user.schema';

import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserProfileDto } from './dto/userprofile.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name)
    private userModel: Model<User>,
    private jwtService: JwtService,
    @InjectModel(UserProfile.name)
    private userProfileModel: Model<UserProfile>,
  ) {}

  async getUserFromJwt(token: string): Promise<User | null> {
    try {
      const decodedToken = this.jwtService.verify(token);
      const userId = decodedToken.id;

      // Cari pengguna berdasarkan ID
      const user = await this.userModel.findById(userId);

      return user || null;
    } catch (error) {
      // Handle error ketika token tidak valid atau tidak dapat di-decode
      return null;
    }
  }

  async signUp(signUpDto: SignUpDto): Promise<{ message: string }> {
    const {  email,userName, password,confirmPassword } = signUpDto;

    const already = await this.userModel.findOne({ email });
  if (already) {
    throw new BadRequestException('Email already exists');
  }


    if (password !== confirmPassword) {
        throw new BadRequestException('Passwords do not match');
      }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await this.userModel.create({
      email,
      userName,
      password: hashedPassword,
    });

    // const token = this.jwtService.sign({ id: user._id });

    return { message: 'Register Succes' };
  }

  async login(loginDto: LoginDto): Promise<{ s:string,token: string }> {
    const { email, password } = loginDto;

    const user = await this.userModel.findOne({ email });

    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatched = await bcrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign({ id: user._id });

    return {s:"yeay!! Login succes", token };
  }

  async profile(profiledto: UserProfileDto): Promise<{ p: string}> {
    const {
      profilePicture,
      displayName,
      gender,
      birthday,
      horoscope,
      zodiac,
      height,
      weight,
    } = profiledto;
  
    const newProfile = await this.userProfileModel.create({
      profilePicture,
      displayName,
      gender,
      birthday,
      horoscope,
      zodiac,
      height,
      weight,
    });
  
    return { p: 'Profil berhasil dibuat' };
  }
  // async profile(profiledto: UserProfileDto): Promise<{ p: string }> {
  //   const newProfile = new this.userProfileModel(profiledto); // Membuat instansi profil baru
  //   await newProfile.save(); // Menyimpan profil ke database
  //   return { p: 'Profil berhasil dibuat' };
  // }

  async getUserProfileById(userId: string): Promise<UserProfile> {
    // Panggil model UserProfile dan cari profil berdasarkan userId
    const userProfile = await this.userProfileModel.findOne({ userId }).exec();
  
    return userProfile;
  }

  async editProfile(userId: string, userProfileDto: UserProfileDto): Promise<{ message: string }> {
    const user = await this.userProfileModel.findById(userId);
  
    if (!user) {
      throw new NotFoundException(`User with id ${userId} not found`);
    }
  
    // Update profil dengan data baru
    if (userProfileDto.profilePicture) {
      user.profilePicture = userProfileDto.profilePicture;
    }

    if (userProfileDto.displayName) {
      user.displayName = userProfileDto.displayName;
    }
  
    if (userProfileDto.gender) {
      user.gender = userProfileDto.gender;
    }
  
    if (userProfileDto.birthday) {
      user.birthday = userProfileDto.birthday;
    }

    if (userProfileDto.horoscope) {
      user.horoscope = userProfileDto.horoscope;
    }

    if (userProfileDto.zodiac) {
      user.zodiac = userProfileDto.zodiac;
    }

    if (userProfileDto.height) {
      user.height = userProfileDto.height;
    }

    if (userProfileDto.weight) {
      user.weight = userProfileDto.weight;
    }
    
  
    await user.save();
  
    return { message: 'Profil berhasil diubah' };
  }
  
}

   