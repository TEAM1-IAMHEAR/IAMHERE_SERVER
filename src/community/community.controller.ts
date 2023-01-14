import {
  Body,
  Controller,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Query,
} from '@nestjs/common';
import { CommunityService } from './community.service';
import { ReqCommunityDto } from './dto/req-community.dto';

@Controller('community')
export class CommunityController {
  constructor(private readonly communityService: CommunityService) {}

  @Post('/:userId')
  public async postCommunity(@Body() community: ReqCommunityDto) {
    await this.communityService.postcommunity(community);
    return { status: 201, message: 'success' };
  }

  @Get('/')
  public async getcommunity() {
    return await this.communityService.getCommunity();
  }
}
