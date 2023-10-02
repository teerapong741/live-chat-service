import { Body, Controller, Post } from '@nestjs/common';
import { ResponseDto } from 'src/dto/response.dto';
import { AuthRoom } from 'src/models/auth.model';
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

  @Post('sign-in-streamer')
  signInStreamer(@Body('key') key: string): AuthRoom {
    console.log(key);
    return this._authSV.signInStreamer(key);
  }

  @Post('sign-up')
  signUp(
    @Body('username') username: string,
    @Body('password') password: string,
  ): ResponseDto<null> {
    return this._authSV.signUp({ username, password });
  }
}
