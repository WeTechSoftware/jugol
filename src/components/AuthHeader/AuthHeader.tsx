import {Text, VStack} from 'native-base';
import React from 'react';
import {fontSizes} from '../../theme-config/typography';
import {IAuthHeader} from './AuthHeader.types';

export default function AuthHeader({
  title,
  subTitle,
  titleStyle,
  subTitleStyle,
  ...rest
}: IAuthHeader) {
  return (
    <VStack space="3" {...rest}>
      {title ? (
        <Text fontWeight={600} fontSize={fontSizes['3xl']} {...titleStyle}>
          {title}
        </Text>
      ) : null}
      {subTitle ? (
        <Text color={'dark.200'} fontSize={fontSizes.sm} {...subTitleStyle}>
          {subTitle}
        </Text>
      ) : null}
    </VStack>
  );
}
