import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { EnvironmentConstant } from './common/constants/env.constant';
import { AllExceptionsFilter } from './exception-filter';
import { ScheduleModule } from '@nestjs/schedule';
import { UserModule } from './users/users.module';
import { APP_FILTER } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';


require('dotenv').config();

@Module({
  imports: [
    ScheduleModule.forRoot(),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
    useFactory: (configService: ConfigService) => ({
      uri: configService.get(EnvironmentConstant.DATABASE_URL),
    }),
    inject: [ConfigService],
  }),
  UserModule,
  ThrottlerModule.forRoot([{
    ttl: 60000,
    limit: 10,
  }]),
],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    }
  ],
})
export class AppModule { }


