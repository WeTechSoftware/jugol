import {Pressable, Text} from 'native-base';
import React from 'react';
import {ISettingButton} from './SettingButton.types';
import {fontSizes} from '../../theme-config/typography';

export default function SettingButton({
  title,
  subTitle,
  ...rest
}: ISettingButton) {
  return (
    <Pressable {...rest}>
      <Text fontSize={fontSizes.sm} fontWeight={700}>
        {title}
      </Text>
      <Text color="dark.200">{subTitle}</Text>
    </Pressable>
  );
}
