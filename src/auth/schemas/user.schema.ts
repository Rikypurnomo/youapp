import {Prop, Schema,SchemaFactory } from "@nestjs/mongoose";
import { Document } from 'mongoose';

enum Gender {
    Male = "male",
    Female = "female",
  }

  @Schema({
    timestamps: true
  })
  export class UserProfile {

    @Prop()
    profilePicture: string;

    @Prop({required: true })
    displayName: string;

    @Prop({ type: String, enum: Gender, default: Gender.Male })
    gender: string;

    @Prop({ type: Date})
    birthday: Date;

    @Prop()
    horoscope: string;

    @Prop()
    zodiac: string;

    @Prop()
    height: string;

    @Prop()
    weight: string;
  }

@Schema({
    timestamps:true
})
export class User extends Document{

    @Prop({ required: true, unique: true, message: "Duplicate email entered" })
    email: string;    

    @Prop({required: true })
    userName:string

    @Prop({required: true })
    password: string;
   
}

export const UserSchema = SchemaFactory.createForClass(User)
export const UserProfileSchema = SchemaFactory.createForClass(UserProfile)