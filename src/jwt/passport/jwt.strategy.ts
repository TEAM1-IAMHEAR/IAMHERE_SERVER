import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from 'src/entities/user.model';
import { badRequestException } from 'src/exception/exception.index';
import { Repository } from 'typeorm';
import { Payload } from '../payload/jwt-payload';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {
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
