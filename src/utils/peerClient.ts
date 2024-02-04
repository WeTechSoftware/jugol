import Peer from 'react-native-peerjs';
import {PEER_CONFIG} from '@config';

let peer: any = null;

const getPeer = () => {
  if (!peer) {
    return new Peer();
  }
  return peer;
};

export default getPeer;
