import { MessageType } from 'src/types/message.type';

export interface SendMessageDto {
  roomId: string,
  type: MessageType;
  message: string,
  senderId: string,
  receiveId?: string,
  giftCount: number,
}

export type SendMessageResponse = null;