import * as moment from 'moment';
import { User } from 'src/models/user.model';
import { RoleType } from 'src/types/role.type';
import { v4 as uuidv4 } from 'uuid';

export const USERS: User[] = [
  {
    id: uuidv4(),
    username: 'admin',
    imageUrl:
      'https://thethaiger.com/th/wp-content/uploads/2022/07/289106030_154221420513903_2487995507056417488_n.jpg',
    name: 'ADMIN',
    age: 0,
    price: 0,
    status: 'LIVE',
    role: RoleType.ADMIN,
    wallet: {
      id: uuidv4(),
      wallet: 0,
    },
    createdAt: moment().toDate(),
  },
  {
    id: uuidv4(),
    username: 'stream_1',
    imageUrl:
      'https://thethaiger.com/th/wp-content/uploads/2022/07/289106030_154221420513903_2487995507056417488_n.jpg',
    name: 'BOY THE VEER',
    age: 26,
    price: 30,
    status: 'LIVE',
    role: RoleType.STREAMER,
    wallet: {
      id: uuidv4(),
      wallet: 0,
    },
    createdAt: moment().toDate(),
  },
  {
    id: uuidv4(),
    username: 'stream_2',
    imageUrl:
      'https://img.soccersuck.com/images/2022/08/12/Onlyfans-Deerlong.png',
    name: 'Deer long',
    age: 27,
    price: 15,
    status: 'LIVE',
    role: RoleType.STREAMER,
    wallet: {
      id: uuidv4(),
      wallet: 0,
    },
    createdAt: moment().toDate(),
  },
  {
    id: uuidv4(),
    username: 'stream_3',
    imageUrl:
      'https://img.soccersuck.com/images/2022/08/12/Onlyfans-BewSasiparpha.png',
    name: 'Bew Sasiparpha',
    age: 28,
    price: 10,
    status: 'LIVE',
    role: RoleType.STREAMER,
    wallet: {
      id: uuidv4(),
      wallet: 0,
    },
    createdAt: moment().toDate(),
  },
  {
    id: uuidv4(),
    username: 'stream_4',
    imageUrl:
      'https://img.soccersuck.com/images/2022/08/12/Onlyfans-Mewnii.png',
    name: 'Mewnii',
    age: 25,
    price: 20,
    status: 'LIVE',
    role: RoleType.STREAMER,
    wallet: {
      id: uuidv4(),
      wallet: 0,
    },
    createdAt: moment().toDate(),
  },
  {
    id: uuidv4(),
    username: 'stream_5',
    imageUrl:
      'https://thethaiger.com/th/wp-content/uploads/2022/07/289106030_154221420513903_2487995507056417488_n.jpg',
    name: 'BOY THE VEER',
    age: 26,
    price: 30,
    status: 'LIVE',
    role: RoleType.STREAMER,
    wallet: {
      id: uuidv4(),
      wallet: 0,
    },
    createdAt: moment().toDate(),
  },
  {
    id: uuidv4(),
    username: 'stream_6',
    imageUrl:
      'https://img.soccersuck.com/images/2022/08/12/Onlyfans-Deerlong.png',
    name: 'Deer long',
    age: 27,
    price: 15,
    status: 'LIVE',
    role: RoleType.STREAMER,
    wallet: {
      id: uuidv4(),
      wallet: 0,
    },
    createdAt: moment().toDate(),
  },
  {
    id: uuidv4(),
    username: 'stream_7',
    imageUrl:
      'https://img.soccersuck.com/images/2022/08/12/Onlyfans-BewSasiparpha.png',
    name: 'Bew Sasiparpha',
    age: 28,
    price: 10,
    status: 'LIVE',
    role: RoleType.STREAMER,
    wallet: {
      id: uuidv4(),
      wallet: 0,
    },
    createdAt: moment().toDate(),
  },
  {
    id: uuidv4(),
    username: 'stream_8',
    imageUrl:
      'https://img.soccersuck.com/images/2022/08/12/Onlyfans-Mewnii.png',
    name: 'Mewnii',
    age: 25,
    price: 20,
    status: 'LIVE',
    role: RoleType.STREAMER,
    wallet: {
      id: uuidv4(),
      wallet: 0,
    },
    createdAt: moment().toDate(),
  },
];
