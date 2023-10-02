import { Controller, Get } from '@nestjs/common';
import { ResponseDto } from 'src/dto/response.dto';
import { User } from 'src/models/user.model';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private _userSV: UserService) {}

  @Get('streamers')
  streamers(): ResponseDto<User[]> {
    return this._userSV.streamers();
  }
}
