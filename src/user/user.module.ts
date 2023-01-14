import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from 'src/user/user.controller';
import { JwtStrategy } from 'src/jwt/passport/jwt.strategy';
import { UserService } from 'src/user/user.service';
import { User } from 'src/entities/user.model';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [UserController],
  providers: [UserService, JwtStrategy],
  exports: [UserService],
})
export class UserModule {}
