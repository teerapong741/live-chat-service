import { RoomWithAnswer } from "./room-with-answer.model";
import { RoomWithOffer } from "./room-with-offer.model";

export interface RoomOA {
  roomId: string;
  userId: string;
  offer: RoomWithOffer;
  answer: RoomWithAnswer;
}
