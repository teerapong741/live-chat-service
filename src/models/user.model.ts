import { TLiveStatus } from 'src/types/live-status.type';

export interface User {
  id: string;
  imageUrl: string;
  username: string,
  name: string;
  age: number;
  description?: string;
  price: number;
  status: TLiveStatus;
  createdAt: Date;
}
