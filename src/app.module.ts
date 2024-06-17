import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentConstant } from './common/constants/env.constant';

require('dotenv').config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
    useFactory: (configService: ConfigService) => ({
      uri: configService.get(EnvironmentConstant.DATABASE_URL),
    }),
    inject: [ConfigService],
  }),],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }


