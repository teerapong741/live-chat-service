import { HttpStatus, Injectable } from '@nestjs/common';
import { ResponseDto } from 'src/dto/response.dto';
import { USERS } from 'src/mocks/users.db';
import { User } from 'src/models/user.model';
import { RoleType } from 'src/types/role.type';

@Injectable()
export class UserService {
  constructor() {}

  streamers(): ResponseDto<User[]> {
    const users = USERS.filter(item => item.role === RoleType.STREAMER);
    return {
      data: users,
      status: HttpStatus.OK
    }
  }

  buyCoin(userId: string): ResponseDto<number> {
    const index = USERS.findIndex(item => item.id === userId);
    USERS[index].price += 100;
    
    return {
      data: USERS[index].price,
      status: HttpStatus.OK
    }
  }
}
