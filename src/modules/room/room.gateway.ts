import { WebSocketGateway, WebSocketServer } from '@nestjs/websockets';
import { MessageDto } from 'src/dto/message.dto';
import { RoomWithAnswer } from 'src/models/room-with-answer.model';
import { SocketMessageType } from 'src/types/socket-message.type';

@WebSocketGateway({ cors: { origin: '*' } })
export class RoomGateway {
  @WebSocketServer() server;

  joinRoom(ownerId: string, answer: RoomWithAnswer) {
    this.server.emit(`room@${ownerId}`, answer);
  }

  newMessage(roomId: string, data: MessageDto) {
    this.server.emit(`room@${roomId}`, {
      type: SocketMessageType.NEW_MESSAGE,
      data: data,
    });
  }
}
