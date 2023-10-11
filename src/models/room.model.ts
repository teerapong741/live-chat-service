import { TLiveStatus } from 'src/types/live-status.type';
import { User } from './user.model';

export interface Room {
  id: string;
  key: string;
  price: number;
  streamers: User[];
  viewers: User[];
  status: TLiveStatus;
  startedAt: Date | null;
  createdAt: Date;
  // offers: RoomOA[];
}
