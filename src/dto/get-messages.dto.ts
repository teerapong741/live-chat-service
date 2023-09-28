import { Message } from 'src/models/message.model';

export interface GetMessagesDto {
  roomId: string,
}

export type GetMessagesResponse = Message[];