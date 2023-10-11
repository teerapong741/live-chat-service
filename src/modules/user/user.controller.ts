import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post('buy-coin')
  buyCoin(@Body('userId') userId: string): ResponseDto<number> {
    return this._userSV.buyCoin(userId);
  }
}
