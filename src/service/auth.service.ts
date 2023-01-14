import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'src/dto/sign-up.dto';
import { User } from 'src/orm/models/user.model';
import { UserRepository } from 'src/repository/user.repository';
import { LoginRequestDto } from 'src/dto/login.dto';
import {
  ExistNicknameException,
  notConfirmPasswordException,
  notFoundUserException,
} from 'src/exception/exception.index';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  public async signUp(user: SignUpDto): Promise<User> {
    if (
      await this.userRepository.findOne({ where: { nickname: user.nickname } })
    ) {
      throw ExistNicknameException;
    }
    const hashPassword = await bcrypt.hash(user.password, 12);
    user.password = hashPassword;

    return await this.userRepository.signUp(user);
  }

  public async jwtLogIn(dto: LoginRequestDto) {
    const { nickname, password } = dto;

    const user: User = await this.userRepository.findOne({
      where: { nickname },
    });
    if (!user) {
      throw notFoundUserException;
    }

    const confirmPassword: boolean = await bcrypt.compare(
      password,
      user.password,
    );
    if (!confirmPassword) {
      throw notConfirmPasswordException;
    }

    const payload = { nickname, sub: user.id };

    return {
      token: this.jwtService.sign(payload),
      userId: user.id,
    };
  }
}
