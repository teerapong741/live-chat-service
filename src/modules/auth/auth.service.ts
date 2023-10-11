import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import * as moment from 'moment';
import { ResponseDto } from 'src/dto/response.dto';
import { USERS } from 'src/mocks/users.db';
import { User } from 'src/models/user.model';
import { RoleType } from 'src/types/role.type';
import { v4 as uuidv4 } from 'uuid';
import { RoomService } from './../room/room.service';
import { SignInPayload, SignInResponse } from './auth.dto';

@Injectable()
export class AuthService {
  constructor(private roomService: RoomService) {}

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

  signInStreamer(key: string) {
    const room = this.roomService.rooms$.value.find(item => item.key == key);
    if (!room) throw new HttpException('Not found room', HttpStatus.NOT_FOUND);
    if (room.status === 'LIVE') throw new HttpException('This room is living', HttpStatus.CONFLICT);

    return {
      room: room,
      token: 'fakeToken',
      refreshToken: 'fakeRefreshToken',
    }
  }

  signUp(payload: SignInPayload): ResponseDto<null> {
    const { username } = payload;

    const users = USERS;
    const findUser = users.find((item) => item.username === username);

    if (findUser) throw new NotFoundException('Username is exist!');

    const newUser: User = {
      id: uuidv4(),
      username: username,
      imageUrl: null,
      name: username,
      age: 0,
      price: 500,
      status: 'LIVE',
      role: RoleType.VIEWER,
      wallet: {
        id: uuidv4(),
        wallet: 0,
      },
      createdAt: moment().toDate(),
    };
    USERS.push(newUser);

    const res: ResponseDto<null> = {
      status: HttpStatus.OK,
      data: null,
    };

    return res;
  }

}
