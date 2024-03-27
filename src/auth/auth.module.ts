import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './local.strategy';
import { UserService } from '../services/user.service';
import { User } from '../entities/user.entity';

@Module({
    imports: [
        PassportModule,
        JwtModule.register({
            secret: 'aaa',
            signOptions: { expiresIn: '5m' },
        }),
        TypeOrmModule.forFeature([User]), 
    ],
    providers: [AuthService, LocalStrategy, UserService],
    controllers: [AuthController],
})
export class AuthModule {}
