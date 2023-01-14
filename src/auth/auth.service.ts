import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from 'src/auth/dto/sign-up.dto';
import { LoginRequestDto } from 'src/auth/dto/login.dto';
import {
  ExistNicknameException,
  notConfirmPasswordException,
  notFoundUserException,
} from 'src/exception/exception.index';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/entities/user.model';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  public async signUp(user: SignUpDto) {
    const isExistUser: User = await this.userRepository.findOne({
      where: { nickname: user.nickname },
    });

    if (isExistUser) {
      throw ExistNicknameException;
    }

    const password = await bcrypt.hash(user.password, 12);

    await this.userRepository.save({
      ...user,
      password,
    });
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
