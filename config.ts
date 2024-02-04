import { Platform } from 'react-native';

export const BASE_URL = 'http://54.214.69.31:3500';
// export const BASE_URL = 'http://192.168.0.116:3500';
// export const BASE_URL = 'https://jugal-api.onrender.com';
export const DEFAULT_IMAGE = 'https://res.cloudinary.com/dwfthpcaq/image/upload/v1674708156/profile-user-icon-isolated-on-white-background-eps10-free-vector_tukpw6.jpg'
export const API_URL = BASE_URL + '/api/';
export const GOOGLE_CLIENT_ID_ANDROID =
  '722045760591-teupqlohuqfrtckptccoomuccb8mj1st.apps.googleusercontent.com';
export const GOOGLE_CLIENT_ID_IOS =
  'com.googleusercontent.apps.722045760591-iptvf6u71ha9osj5mqpg5laal5o338fv';

export const GOOGLE_CLIENT_ID =
  Platform.OS === 'ios' ? GOOGLE_CLIENT_ID_IOS : GOOGLE_CLIENT_ID_ANDROID;

export const STRIPE_PUBLISHED_KEY =
  'pk_test_51Ml76qCYaVgNbEBjnF2E1DRaw4NG4mZhLCBusp43J5SYAH2HGRjBGerSU8SZE9LeJIneYvdEBLnxwcnyo9YkifFl00dKHHpvHR';

// export const PEER_CONFIG = {
//   host: '192.168.0.7',
//   port: 4000,
//   path: '/peer',
//   secure: false,
//   config: {
//     iceServers: [
//     {
//       url: 'stun:global.stun.twilio.com:3478',
//       urls: 'stun:global.stun.twilio.com:3478'
//     },
//     {
//       url: 'turn:global.turn.twilio.com:3478?transport=udp',
//       username: '0548f14f3f7bed5564b44ff4744aac1907b50e002a15446230ab1568c14d0d38',
//       urls: 'turn:global.turn.twilio.com:3478?transport=udp',
//       credential: '1KWzdBmXnPceAv4q6UgokJPiptpAHxTUV6LHAoJ7/LA='
//     },
//     {
//       url: 'turn:global.turn.twilio.com:3478?transport=tcp',
//       username: '0548f14f3f7bed5564b44ff4744aac1907b50e002a15446230ab1568c14d0d38',
//       urls: 'turn:global.turn.twilio.com:3478?transport=tcp',
//       credential: '1KWzdBmXnPceAv4q6UgokJPiptpAHxTUV6LHAoJ7/LA='
//     },
//     {
//       url: 'turn:global.turn.twilio.com:443?transport=tcp',
//       username: '0548f14f3f7bed5564b44ff4744aac1907b50e002a15446230ab1568c14d0d38',
//       urls: 'turn:global.turn.twilio.com:443?transport=tcp',
//       credential: '1KWzdBmXnPceAv4q6UgokJPiptpAHxTUV6LHAoJ7/LA='
//     }
//   ],
//   },
// };

export const FREE_ICE_SERVERS = [
  { url: 'stun:stun01.sipphone.com' },
  { url: 'stun:stun.ekiga.net' },
  { url: 'stun:stun.fwdnet.net' },
  { url: 'stun:stun.ideasip.com' },
  { url: 'stun:stun.iptel.org' },
  { url: 'stun:stun.rixtelecom.se' },
  { url: 'stun:stun.schlund.de' },
  { url: 'stun:stun.l.google.com:19302' },
  { url: 'stun:stun1.l.google.com:19302' },
  { url: 'stun:stun2.l.google.com:19302' },
  { url: 'stun:stun3.l.google.com:19302' },
  { url: 'stun:stun4.l.google.com:19302' },
  { url: 'stun:stunserver.org' },
  { url: 'stun:stun.softjoys.com' },
  { url: 'stun:stun.voiparound.com' },
  { url: 'stun:stun.voipbuster.com' },
  { url: 'stun:stun.voipstunt.com' },
  { url: 'stun:stun.voxgratia.org' },
  { url: 'stun:stun.xten.com' },
  {
    url: 'turn:numb.viagenie.ca',
    credential: 'muazkh',
    username: 'webrtc@live.com',
  },
  {
    url: 'turn:192.158.29.39:3478?transport=udp',
    credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
    username: '28224511:1379330808',
  },
  {
    url: 'turn:192.158.29.39:3478?transport=tcp',
    credential: 'JZEOEt2V3Qb0y27GRntt2u2PAYA=',
    username: '28224511:1379330808',
  },
];
