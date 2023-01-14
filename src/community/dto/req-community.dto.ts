import { IsNumber, IsString, Length } from 'class-validator';

export class ReqCommunityDto {
  @IsNumber()
  x: number;

  @IsNumber()
  y: number;

  @IsString()
  @Length(50)
  memo: string;

  @IsString()
  @Length(256)
  image: string;

  @IsNumber()
  userId: number;
}
