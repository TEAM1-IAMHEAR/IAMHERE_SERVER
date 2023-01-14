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
import { Community } from 'src/Entities/community.model';
import { ReqCommunityDto } from './dto/req-community.dto';

@Injectable()
export class CommunityService {
  constructor(
    @InjectRepository(Community)
    private readonly communityRepository: Repository<Community>,
  ) {}

  public async postcommunity(dto: ReqCommunityDto) {
    const { x, y, memo, image, userId } = dto;
    const community = await this.communityRepository.findOne({
      where: {
        userId,
      },
    });

    if (community) {
      await this.communityRepository.update({
        x,
        y,
        memo,
        image,
      });
    }
    await this.communityRepository.create({
      x,
      y,
      memo,
      image,
    });
  }

  public async getCommunity() {
    await this.communityRepository.findAll();
  }
}
