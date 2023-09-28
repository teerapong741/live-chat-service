import * as moment from 'moment';
import { User } from 'src/models/user.model';

export const USERS: User[] = [
  {
    id: '1',
    // id: uuidv4(),
    username: 'cam1',
    imageUrl:
      'https://thethaiger.com/th/wp-content/uploads/2022/07/289106030_154221420513903_2487995507056417488_n.jpg',
    name: 'BOY THE VEER',
    age: 26,
    price: 30,
    status: 'LIVE',
    createdAt: moment().toDate(),
  },
  {
    id: '2',
    // id: uuidv4(),
    username: 'cam2',
    imageUrl:
      'https://img.soccersuck.com/images/2022/08/12/Onlyfans-Deerlong.png',
    name: 'Deer long',
    age: 27,
    price: 15,
    status: 'LIVE',
    createdAt: moment().toDate(),
  },
  {
    id: '3',
    // id: uuidv4(),
    username: 'cam3',
    imageUrl:
      'https://img.soccersuck.com/images/2022/08/12/Onlyfans-BewSasiparpha.png',
    name: 'Bew Sasiparpha',
    age: 28,
    price: 10,
    status: 'LIVE',
    createdAt: moment().toDate(),
  },
  {
    id: '4',
    // id: uuidv4(),
    username: 'cam4',
    imageUrl:
      'https://img.soccersuck.com/images/2022/08/12/Onlyfans-Mewnii.png',
    name: 'Mewnii',
    age: 25,
    price: 20,
    status: 'LIVE',
    createdAt: moment().toDate(),
  },
];
