import { atom } from 'recoil';

export const userTokenState = atom({
  key: 'tokenState',
  default: '',
});
