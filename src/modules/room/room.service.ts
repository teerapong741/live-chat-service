import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { BehaviorSubject } from 'rxjs';
import { CheckIsOwnerRoomDto } from 'src/dto/check-is-owner-room.dto';
import { CreateRoomDto } from 'src/dto/create-room.dto';
import { JoinRoomDto } from 'src/dto/join-room.dto';
import { LeaveRoomDto } from 'src/dto/leave-room.dto';
import { RemoveRoomDto } from 'src/dto/remove-room.dto';
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
    const findRoom = rooms.find((item) =>
      item.streamers.map((item) => item.id).includes(payload.userId),
    );

    return {
      status: HttpStatus.OK,
      data: !!findRoom,
    };
  }

  createRoom(payload: CreateRoomDto) {
    let key = uuidv4();
    const rooms = this.rooms$.value;
    while (rooms.find(item => item.key === key)) {
      key = uuidv4();
    }

    const newRoom: Room = {
      id: uuidv4(),
      key: key,
      status: 'OFFLINE',
      imageRoomUrl: payload.imageRoomUrl,
      price: payload.price,
      roomName: payload.roomName,
      streamers: USERS.filter((item) => payload.streamers.includes(item.id)),
      viewers: [],
    };

    this.rooms$.next([...this.rooms$.value, newRoom]);
    return {
      status: HttpStatus.OK,
      data: {
        roomId: newRoom.id,
      },
    };
  }

  removeRoom(payload: RemoveRoomDto): ResponseDto<null> {
    this.rooms$.next([
      ...this.rooms$.value.filter((item) => item.id !== payload.roomId),
    ]);

    return {
      status: HttpStatus.OK,
      data: null,
    };
  }

  joinRoom(payload: JoinRoomDto) {
    const findRoomIndex = this.rooms$.value.findIndex(
      (item) => item.id === payload.roomId,
    );
    if (findRoomIndex < 0) {
      throw new HttpException('Not found room!', HttpStatus.NOT_FOUND);
    }
    const findRoom = this.rooms$.value[findRoomIndex];

    const isStreamer = payload.isStreamer;
    if (isStreamer) {
      const rooms = this.rooms$.value;
      const room = rooms[findRoomIndex];
      room.status = 'LIVE';
      this._roomGateway.streamerJoinRoom(
        payload.roomId,
        findRoom.viewers.map((item) => item.id),
      );
    } else {
      const findUser = USERS.find((user) => user.id === payload.userId);
      if (!findUser) {
        throw new HttpException('Not found user!', HttpStatus.NOT_FOUND);
      }

      const rooms = this.rooms$.value;
      const room = rooms[findRoomIndex];
      room.viewers.push(findUser);
      this.rooms$.next(rooms);
      this._roomGateway.viewerJoinRoom(payload.roomId, payload.userId);
    }

    return {
      status: HttpStatus.OK,
      data: null,
    };
  }

  leaveRoom(payload: LeaveRoomDto) {
    const findRoomIndex = this.rooms$.value.findIndex(
      (item) => item.id === payload.roomId,
    );
    if (findRoomIndex > -1) {
      const rooms = this.rooms$.value;
      const room = rooms[findRoomIndex];
      room.viewers = room.viewers.filter((item) => item.id !== payload.userId);
      this.rooms$.next(rooms);
    }

    return {
      status: HttpStatus.OK,
      data: null,
    };
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
    };
    this._roomGateway.newMessage(roomId, newMessage);

    return {
      status: HttpStatus.OK,
      data: null,
    };
  }
}
