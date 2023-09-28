import { Body, Controller, Get, Post } from '@nestjs/common';
import { CheckIsOwnerRoomDto } from 'src/dto/check-is-owner-room.dto';
import { CreateRoomDto } from 'src/dto/create-room.dto';
import { GetMessagesDto, GetMessagesResponse } from 'src/dto/get-messages.dto';
import { JoinRoomDto } from 'src/dto/join-room.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { SendMessageDto, SendMessageResponse } from 'src/dto/send-messages.dto';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(private _roomSV: RoomService) {}

  @Get('room-list')
  roomList() {
    return this._roomSV.roomList();
  }

  @Post('check-is-owner-room')
  checkIsOwnerRoom(@Body('payload') payload: CheckIsOwnerRoomDto) {
    return this._roomSV.checkIsOwnerRoom(payload);
  }

  @Post('create-room')
  createRoom(@Body('payload') payload: CreateRoomDto) {
    return this._roomSV.createRoom(payload);
  }

  @Post('join-room')
  joinRoom(@Body('payload') payload: JoinRoomDto) {
    return this._roomSV.joinRoom(payload);
  }

  @Post('get-messages')
  getMessages(@Body('payload') payload: GetMessagesDto): ResponseDto<GetMessagesResponse> {
    return this._roomSV.getMessages(payload);
  }

  @Post('send-messages')
  sendMessages(@Body('payload') payload: SendMessageDto): ResponseDto<SendMessageResponse> {
    return this._roomSV.sendMessages(payload);
  }
}
