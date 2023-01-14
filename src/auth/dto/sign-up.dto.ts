import { IsNumber, IsString, Length } from 'class-validator';

export class SignUpDto {
  @IsString()
  @Length(15)
  nickname: string;

  @IsString()
  @Length(25)
  password: string;

  @IsNumber()
  age: number;

  @IsString()
  @Length(4)
  mbti: string;

  @IsString()
  @Length(256)
  profile: string;
}
