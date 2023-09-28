import { TLiveStatus } from 'src/types/live-status.type';
import { Message } from './message.model';
import { RoomWithAnswer } from './room-with-answer.model';
import { RoomWithOffer } from './room-with-offer.model';
import { User } from './user.model';

export interface Room {
  id: string;
  userId: string;
  ownerData: User;
  offer: RoomWithOffer;
  status: TLiveStatus;
  answers: {
    userId: string;
    answer: RoomWithAnswer;
  }[];
  messages: Message[];
}
