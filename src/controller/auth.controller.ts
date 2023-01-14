import { Body, Controller, Post } from '@nestjs/common';
import { LoginRequestDto } from 'src/dto/login.dto';
import { SignUpDto } from 'src/dto/sign-up.dto';
import { AuthService } from 'src/service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  public async signUp(@Body() user: SignUpDto) {
    await this.authService.signUp(user);
    return { status: 201, message: 'success' };
  }

  @Post('/login')
  public async logIn(@Body() dto: LoginRequestDto) {
    return await this.authService.jwtLogIn(dto);
  }
}
