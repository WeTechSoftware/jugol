// import { fontSizes } from '@typography';
// import moment from 'moment';
// import { HStack, Text, VStack } from 'native-base';
// import React from 'react';
// import { Bubble, TMessage } from 'react-native-gifted-chat';
// import GridImageView from 'react-native-grid-image-viewer';

// export default function RenderBubble(props: Bubble<TMessage>['props']) {
//   const files = JSON.parse(props?.currentMessage?.image);
//   const filteredImages = files.filter(file => file?.resourceType === 'image');
//   const imagesURI = filteredImages?.map(image => image?.fileUrl)

//   return (
//     <VStack paddingRight={'40px'} mb={'12px'}>
//       <Bubble
//         {...props}
//         wrapperStyle={{
//           right: {
//             backgroundColor: props.currentMessage.text ? '#F3F3F3' : 'white',
//             padding: props.currentMessage.text ? 10 : 0,
//             borderBottomRightRadius: 0,
//           },
//           left: {
//             backgroundColor: props.currentMessage.text ? '#fcf2fc' : 'white',
//             padding: props.currentMessage.text ? 10 : 0,
//             borderBottomLeftRadius: 0,
//           },
//         }}
//         textStyle={{
//           right: {
//             color: '#000',
//             fontWeight: props.currentMessage.text === 'missed' ? 'bold' : 'normal'
//           },
//           left: {
//             color: '#000',
//             fontWeight: props.currentMessage.text === 'missed' ? 'bold' : 'normal'
//           },
//         }}
//         renderTicks={() => {
//           return null;
//         }}
//         renderMessageImage={(props) => {
//           return (
//             <HStack>
//               <GridImageView {...props} data={imagesURI} />
//             </HStack>
//           )
//         }}
//       />
//       <Text
//         color={'gray.200'}
//         alignSelf={props.position === 'right' ? 'flex-end' : 'flex-start'}
//         fontSize={fontSizes.xs}
//         mt={'4px'}>
//         {moment(props.currentMessage.createdAt).format('LT')}
//       </Text>
//     </VStack>
//   );
// }

import {selectUID} from '@store/features/auth/authSlice';
import {fontSizes} from '@typography';
import moment from 'moment';
import {HStack, Text, VStack} from 'native-base';
import React from 'react';
import {Bubble, TMessage} from 'react-native-gifted-chat';
import GridImageViewer from '@ui/GridImageViewer/GridImageViewer';

export default function RenderBubble(props: Bubble<TMessage>['props']) {
  const files = JSON.parse(props?.currentMessage?.image);
  const filteredImages = files.filter(file => file?.resourceType === 'image');
  const imagesURI = filteredImages?.map(image => image?.fileUrl);

  return (
    <VStack paddingRight={'40px'} mb={'12px'}>
      <VStack
        p={props.currentMessage?.text && imagesURI?.length <= 0 ? 2 : 0}
        borderBottomLeftRadius={
          props.currentMessage?.text && props?.position === 'left' ? 7 : 0
        }
        borderBottomRightRadius={
          props.currentMessage?.text && props?.position === 'right' ? 7 : 0
        }
        backgroundColor={
          imagesURI?.length === 0
            ? props?.position === 'right'
              ? 'coolGray.200'
              : 'indigo.100'
            : 'white'
        }>
        {props?.currentMessage?.text ? (
          <Text>{props?.currentMessage?.text}</Text>
        ) : null}
        {imagesURI?.length > 0 ? <GridImageViewer images={imagesURI} /> : null}
      </VStack>
      <Text
        color={'gray.200'}
        alignSelf={props.position === 'right' ? 'flex-end' : 'flex-start'}
        fontSize={fontSizes.xs}
        mt={'4px'}>
        {moment(props.currentMessage.createdAt).format('LT')}
      </Text>
    </VStack>
  );
}
