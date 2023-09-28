import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { CheckIsOwnerRoomDto } from 'src/dto/check-is-owner-room.dto';
import { CreateRoomDto } from 'src/dto/create-room.dto';
import { GetMessagesDto, GetMessagesResponse } from 'src/dto/get-messages.dto';
import { JoinRoomDto } from 'src/dto/join-room.dto';
import { ResponseDto } from 'src/dto/response.dto';
import { SendMessageDto, SendMessageResponse } from 'src/dto/send-messages.dto';
import { USERS } from 'src/mocks/users.db';
import { Message } from 'src/models/message.model';
import { Room } from 'src/models/room.model';
import { v4 as uuidv4 } from 'uuid';
import { RoomGateway } from './room.gateway';

@Injectable()
export class RoomService {
  rooms$ = new BehaviorSubject<Room[]>([]);

  constructor(private _roomGateway: RoomGateway) {}

  roomList() {
    return this.rooms$.value;
  }

  checkIsOwnerRoom(payload: CheckIsOwnerRoomDto) {
    const rooms = this.rooms$.value;
    const findRoom = rooms.find((item) => item.userId === payload.userId);

    return {
      status: HttpStatus.OK,
      data: !!findRoom,
    };
  }

  createRoom(payload: CreateRoomDto) {
    const findUser = USERS.find((item) => item.id === payload.userId);
    if (!findUser) {
      throw new HttpException('Found an error!', HttpStatus.NOT_FOUND);
    }

    if (this.rooms$.value.find((item) => item.userId === payload.userId)) {
      this.rooms$.next([
        ...this.rooms$.value.filter((item) => item.userId !== payload.userId),
      ]);
    }

    const newRoom: Room = {
      id: uuidv4(),
      offer: payload.roomWithOffer,
      userId: payload.userId,
      answers: [],
      status: 'OFFLINE',
      ownerData: { ...findUser },
      messages: []
    };

    this.rooms$.next([...this.rooms$.value, newRoom]);
    return {
      status: HttpStatus.OK,
      data: {
        roomId: newRoom.id,
      },
    };
  }

  joinRoom(payload: JoinRoomDto) {
    const roomIndex = this.rooms$.value.findIndex(
      (item) => item.id === payload.roomId,
    );

    if (roomIndex <= -1) {
      throw new HttpException('Not found room!', HttpStatus.CONFLICT);
    }

    const rooms = this.rooms$.value;
    const room = rooms[roomIndex];
    room.answers = room.answers.filter(
      (item) => item.userId !== payload.userId,
    );
    room.answers.push({ userId: payload.userId, answer: payload.answer });
    this.rooms$.next(rooms);

    this._roomGateway.joinRoom(room.userId, payload.answer);

    return {
      status: HttpStatus.OK,
      data: {
        roomId: room.id,
      },
    };
  }

  getMessages(payload: GetMessagesDto): ResponseDto<GetMessagesResponse> {
    const { roomId } = payload;
    const rooms = this.rooms$.value;
    const find = rooms.find((item) => item.id === roomId);
    if (!find) {
      throw new HttpException('Not found room!', HttpStatus.NOT_FOUND);
    }
    const messages = find.messages.sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
    const response: ResponseDto<GetMessagesResponse> = {
      status: HttpStatus.OK,
      data: messages
    };
    return response;
  }

  sendMessages(payload: SendMessageDto): ResponseDto<SendMessageResponse> {
    const { roomId, message, senderId, type } = payload;
    const rooms = this.rooms$.value;
    const findIndex = rooms.findIndex((item) => item.id === roomId);
    if (findIndex < 0) {
      throw new HttpException('Not found room!', HttpStatus.NOT_FOUND);
    }

    const newMessage: Message = {
      id: uuidv4(),
      created_at: new Date(),
      message,
      room_id: roomId,
      sender_id: senderId,
      type,
    }
    rooms[findIndex].messages.push(newMessage);
    this.rooms$.next(rooms);
    this._roomGateway.newMessage(roomId, newMessage);

    return null;
  }
}
