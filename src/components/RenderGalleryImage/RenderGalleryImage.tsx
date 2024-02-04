// import {Pressable, Image} from 'native-base';
// import React from 'react';
// import {IRenderGalleryImage} from './RenderGalleryImage.types';
// import {MotiView} from 'moti';

// export default function RenderGalleryImage({
//   picture,
//   index,
//   selectedImage,
//   handelImage,
// }: IRenderGalleryImage) {
//   return (
//     <Pressable onPress={() => handelImage(index)}>
//       <MotiView
//         from={{opacity: 0.5, scale: 1}}
//         animate={index === selectedImage ? {opacity: 1, scale: 1.1} : {}}
//         transition={{
//           type: 'timing',
//           duration: 300,
//         }}>
//         <Image
//           source={{uri: picture}}
//           m={'5px'}
//           alt={'imge'}
//           h={'64px'}
//           w={'64px'}
//           borderRadius={'10px'}
//           overflow={'hidden'}
//         />
//       </MotiView>
//     </Pressable>
//   );
// }
