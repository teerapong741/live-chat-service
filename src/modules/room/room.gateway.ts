import {
  WebSocketGateway,
  WebSocketServer
} from '@nestjs/websockets';
import { MessageDto } from 'src/dto/message.dto';
import { RoomWithAnswer } from 'src/models/room-with-answer.model';
import { RoomWithOffer } from 'src/models/room-with-offer.model';
import { SocketMessageType } from 'src/types/socket-message.type';

@WebSocketGateway({ cors: { origin: '*' } })
export class RoomGateway {
  @WebSocketServer() server;

  streamerJoinRoom(roomId: string, viewerIds: string[]) {
    for (let id of viewerIds) {
      this.server.emit(`room@${roomId}@${id}`, {
        type: SocketMessageType.STREAMER_JOIN_ROOM,
        data: {
          roomId,
        },
      });
    }
  }

  requestOffer(roomId: string, viewerId: string) {
    this.server.emit(`room@${roomId}`, {
      type: SocketMessageType.REQ_OFFER,
      data: {
        roomId,
        viewerId,
      },
    });
  }

  sendOffer(roomId: string, viewerId: string, offer: RoomWithOffer) {
    this.server.emit(`room@${roomId}@${viewerId}`, {
      type: SocketMessageType.SEND_OFFER,
      data: {
        roomId,
        viewerId,
        offer
      },
    });
  }

  sendAnswer(roomId: string, viewerId: string, answer: RoomWithAnswer) {
    this.server.emit(`room@${roomId}`, {
      type: SocketMessageType.SEND_ANSWER,
      data: {
        roomId,
        answer,
        viewerId
      },
    });
  }

  viewerJoinRoom(roomId: string, userId: string) {
    this.server.emit(`room@${roomId}`, {
      type: SocketMessageType.VIEWER_JOIN_ROOM,
      data: {
        roomId,
        userId,
      },
    });
    this.requestOffer(roomId, userId);
  }

  newMessage(roomId: string, data: MessageDto) {
    this.server.emit(`room@${roomId}`, {
      type: SocketMessageType.NEW_MESSAGE,
      data: data,
    });
  }
}
