import React from 'react';
import {Pressable, Text} from 'native-base';
import {ILikedScreenButton} from './LikedScreenButton.types';

export default function LikedScreenButton({
  title,
  isClicked,
  ...rest
}: ILikedScreenButton) {
  return (
    <Pressable
      {...rest}
      backgroundColor={isClicked ? 'primary.100' : 'white'}
      py={'11px'}
      px={'15px'}
      borderRadius={'15px'}
      shadow={isClicked ? 9 : 0}
      borderWidth={1}
      borderColor={isClicked ? 'primary.100' : '#E8E6EA'}>
      <Text
        fontWeight={isClicked ? 700 : 400}
        color={isClicked ? 'white' : '#000'}>
        {title}
      </Text>
    </Pressable>
  );
}
