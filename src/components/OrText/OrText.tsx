import { Box, HStack, Text } from 'native-base';
import React from 'react';
import { LayoutChangeEvent } from 'react-native';
import { fontSizes } from '../../theme-config/typography';
import { BoxProps } from '../../types/native-base.types';
import { IOrTextProps } from './OrText.types';

const BoxDivider = ({ width, ...rest }: BoxProps) => (
  <Box width={`${width}px`} h={'1.5px'} bg="#00000040" {...rest} />
);

export default function OrText({
  text = 'or sign up with',
  textStyle,
  dividerStyle,
  ...rest
}: IOrTextProps) {
  const [textWidth, setTextWidth] = React.useState(0);
  const [containerWidth, setContainerWidth] = React.useState(0);

  const onTextLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    setTextWidth(width);
  };

  const onContainerLayout = (e: LayoutChangeEvent) => {
    const { width } = e.nativeEvent.layout;
    setContainerWidth(width);
  };

  const boxWidth = Math.round(
    (containerWidth - textWidth - 40) /* 20px padding on each side */ / 2,
  );

  return (
    <HStack
      alignItems={'center'}
      justifyContent={'space-between'}
      mt={4}
      {...rest}
      onLayout={onContainerLayout}>
      <BoxDivider width={boxWidth} {...dividerStyle} />
      <Text
        fontSize={fontSizes.xs}
        color={'#000000'}
        {...textStyle}
        onLayout={onTextLayout}>
        {text}
      </Text>
      <BoxDivider width={boxWidth} {...dividerStyle} />
    </HStack>
  );
}
