import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class News {

  @Prop()
  title: string;

  @Prop()
  content: string;

  @Prop()
  thumbnail: string;

  @Prop()
  source: string;

}

export type NewsDocument = News & Document;

export const NewsSchema = SchemaFactory.createForClass(News);
