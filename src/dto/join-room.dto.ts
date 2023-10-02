
export interface JoinRoomDto {
  roomId: string,
  userId?: string,
  isStreamer: boolean;
  // offer: RoomWithOffer | null;
  // answer: RoomWithAnswer | null;
}