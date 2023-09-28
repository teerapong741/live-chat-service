import { Body, Controller, Post } from '@nestjs/common';
import { SignInResponse } from './auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private _authSV: AuthService) {}

  @Post('sign-in')
  signIn(
    @Body('username') username: string,
    @Body('password') password: string,
  ): SignInResponse {
    return this._authSV.signIn({ username, password });
  }
}
