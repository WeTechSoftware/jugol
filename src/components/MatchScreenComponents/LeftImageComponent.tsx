import {Box, HStack, Image} from 'native-base';
import React from 'react';
import LOVE from '@images/love.png';
import {IMatchScreenComponents} from './MatchScreenComponents.types';

export default function LeftImageComponent({picture}: IMatchScreenComponents) {
  return (
    <HStack
      position={'absolute'}
      right={'25px'}
      bg={'white'}
      shadow={9}
      style={{transform: [{rotate: '10deg'}]}}
      borderRadius={'15px'}>
      <Image
        source={picture}
        alt="match1"
        h={'240px'}
        w={'160px'}
        borderRadius={'15px'}
        resizeMode={'cover'}
      />
      <Box
        position={'absolute'}
        top={'-35px'}
        left={'-20pxpx'}
        h={'60px'}
        w={'60px'}
        borderRadius={'30px'}
        bg="white"
        shadow={9}
        justifyContent={'center'}
        alignItems={'center'}>
        <Image source={LOVE} alt={'love'} />
      </Box>
    </HStack>
  );
}
