import { RoomWithAnswer } from 'src/models/room-with-answer.model';

export interface JoinRoomDto {
  roomId: string,
  userId: string,
  answer: RoomWithAnswer;
}