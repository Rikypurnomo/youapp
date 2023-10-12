import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import {ConfigModule} from '@nestjs/config'
import {MongooseModule} from '@nestjs/mongoose'
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { WebsocketsModule } from './chat/websockets.module';
import { JobsModule } from './jobs/jobs.module';
import { NewsController } from './news/news.controller';
import { NewsModule } from './news/news.module';
import { NewsDetailController } from './news-detail/news-detail.controller';
import { NewsDetailService } from './news-detail/news-detail.service';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads',
    }),
    ConfigModule.forRoot({
      envFilePath:'.env',
      isGlobal:true,
    }),
    MongooseModule.forRoot(process.env.DB_URI),
    AuthModule,
    WebsocketsModule,
    JobsModule,
    NewsModule],
  controllers: [NewsController, NewsDetailController],
  providers: [AppService, NeswService, NewsDetailService],
})
export class AppModule {}
