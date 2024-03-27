import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CardModule } from './apps/card/card.module';
import { CommentModule } from './apps/comment/comment.module';
import { typeOrmConfig } from './configs/typeorm.config';
import { UserModule } from './apps/user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    CardModule,
    CommentModule,
    UserModule,
    AuthModule,
    ThrottlerModule.forRoot([{
      ttl: 1000,
      limit: 1,
    }]),
  ],
  controllers: [],
  providers: [{
    provide: APP_GUARD,
    useClass: ThrottlerGuard
  }],
})
export class AppModule { }
