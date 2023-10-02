import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { CheckIsOwnerRoomDto } from 'src/dto/check-is-owner-room.dto';
import { CreateRoomDto } from 'src/dto/create-room.dto';
import { JoinRoomDto } from 'src/dto/join-room.dto';
import { LeaveRoomDto } from 'src/dto/leave-room.dto';
import { RemoveRoomDto } from 'src/dto/remove-room.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { SendMessageDto, SendMessageResponse } from 'src/dto/send-messages.dto';
import { RoomWithAnswer } from 'src/models/room-with-answer.model';
import { RoomWithOffer } from 'src/models/room-with-offer.model';
import { RoomGateway } from './room.gateway';
import { RoomService } from './room.service';

@Controller('room')
export class RoomController {
  constructor(
    private _roomSV: RoomService,
    private _roomGateway: RoomGateway,
  ) {}

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

  @Post('remove-room')
  removeRoom(@Body('payload') payload: RemoveRoomDto) {
    return this._roomSV.removeRoom(payload);
  }

  @Post('join-room')
  joinRoom(@Body('payload') payload: JoinRoomDto) {
    return this._roomSV.joinRoom(payload);
  }

  @Post('leave-room')
  leaveRoom(@Body('payload') payload: LeaveRoomDto) {
    return this._roomSV.leaveRoom(payload);
  }

  @Post('send-messages')
  sendMessages(
    @Body('payload') payload: SendMessageDto,
  ): ResponseDto<SendMessageResponse> {
    return this._roomSV.sendMessages(payload);
  }

  @Post('send-offer')
  sendOffer(
    @Body('roomId') roomId: string,
    @Body('viewerId') viewerId: string,
    @Body('offer') offer: RoomWithOffer,
  ) {
    this._roomGateway.sendOffer(roomId, viewerId, offer);
    return {
      status: HttpStatus.OK,
      data: null,
    };
  }

  @Post('send-answer')
  sendAnswer(
    @Body('roomId') roomId: string,
    @Body('viewerId') viewerId: string,
    @Body('answer') answer: RoomWithAnswer,
  ) {
    this._roomGateway.sendAnswer(roomId, viewerId, answer);

    return {
      status: HttpStatus.OK,
      data: null,
    };
  }
}
