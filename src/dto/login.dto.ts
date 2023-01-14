import { IsString, Length } from 'class-validator';

export class LoginRequestDto {
  @IsString()
  @Length(15)
  nickname: string;

  @IsString()
  @Length(8, 16)
  password: string;
}
