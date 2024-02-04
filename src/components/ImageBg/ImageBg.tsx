import {Box, VStack, Image} from 'native-base';
import React from 'react';
import {BoxProps} from '../../types/native-base.types';

type TImagegeBackground = React.ComponentProps<typeof Image>;

interface IImageBackgroundProps extends TImagegeBackground {
  children?: React.ReactNode;
  containerProps?: BoxProps;
}

export default function ImageBg({
  containerProps,
  alt,
  children,
  h = 5,
  w = 5,
  source,
  ...rest
}: IImageBackgroundProps) {
  return (
    <VStack h={h} w={w} position={'relative'} {...containerProps}>
      <Box height={'full'} width={'full'} overflow="hidden" rounded={'3xl'}>
        <Image
          w={'full'}
          h={'full'}
          resizeMode="center"
          alt={alt || 'default-profile'}
          source={source}
          {...rest}
        />
      </Box>
      {children}
    </VStack>
  );
}
