// src/news/news.controller.ts
import { Controller, Get } from '@nestjs/common';
import { NewsService } from './news.service';
import { News } from './schemas/news.schemas';

@Controller('news')
export class NewsController {
  constructor(private readonly newsService: NewsService) {}

  @Get('/news')
  async findAll(): Promise<News[]> {
    return this.newsService.findAll();
  }
}
