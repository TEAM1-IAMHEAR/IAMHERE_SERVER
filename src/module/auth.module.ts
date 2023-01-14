import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwt/passport/jwt.strategy';
import { AuthService } from 'src/service/auth.service';
import { AuthController } from 'src/controller/auth.controller';
import { UserRepository } from 'src/repository/user.repository';
import { UserModule } from './user.module';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt', session: false }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get('JWT_SECRET_KEY'),
        signOptions: { expiresIn: config.get('TOKEN_EXPIRED_TIME') },
      }),
    }),
    TypeOrmModule.forFeature([UserRepository]),
    UserModule,
  ],
  providers: [AuthService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
