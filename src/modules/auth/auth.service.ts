import { Injectable, NotFoundException } from '@nestjs/common';
import { USERS } from 'src/mocks/users.db';
import { SignInPayload, SignInResponse } from './auth.dto';

@Injectable()
export class AuthService {
  signIn(payload: SignInPayload): SignInResponse {
    const { username } = payload;

    const users = USERS;
    const findUser = users.find((item) => item.username === username);

    if (!findUser)
      throw new NotFoundException('Not found user. please try again.');

    return {
      token: 'fakeToken',
      refreshToken: 'fakeRefreshToken',
      user: findUser,
    };
  }
}
