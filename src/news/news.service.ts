// src/news/news.service.ts
import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { News, NewsDocument } from './schemas/news.schemas'; 

@Injectable()
export class NewsService {
  constructor(@InjectModel(News.name) private newsModel: Model<NewsDocument>) {}

  async findAll(): Promise<News[]> {
    return this.newsModel.find().exec();
  }

  async findOne(id: string): Promise<News | null> {
    return this.newsModel.findById(id).exec();
  }
}
