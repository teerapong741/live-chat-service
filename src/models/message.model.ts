import { MessageType } from "src/types/message.type";

export interface Message {
  id: string;
  type: MessageType;
  username: string,
  message: string;
  sender_id: string;
  room_id: string;
  created_at: Date;
}
