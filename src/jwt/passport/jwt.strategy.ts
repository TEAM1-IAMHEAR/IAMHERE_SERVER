import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { badRequestException } from 'src/exception/exception.index';
import { UserRepository } from 'src/repository/user.repository';
import { Payload } from '../payload/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly userRepository: UserRepository) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_KEY,
      ignoreExpiration: false,
    });
  }

  async validate(payload: Payload) {
    const user = await this.userRepository.findOne({
      where: { nickname: payload.nickname },
    });

    if (user) {
      return user;
    } else {
      throw badRequestException;
    }
  }
}
