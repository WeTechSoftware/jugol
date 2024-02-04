import {BASE_URL} from '@config';
import socketIOClient from 'socket.io-client';

let socket: any = null;

const getSocket = () => {
  if (!socket) {
    return socketIOClient(BASE_URL);
  }
  return socket;
};

export default getSocket;
