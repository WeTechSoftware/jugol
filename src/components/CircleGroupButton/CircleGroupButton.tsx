

import CircleButton from '@ui/CircleButton/CircleButton';
import { HStack } from 'native-base';
import React from 'react';
import { ICircleGroupButton } from './CircleGroupButton.types';

export default function CircleGroupButton({ handleClose, handleHeart, handleStar }: ICircleGroupButton) {
  return (
    <HStack
      w={'full'}
      py={4}
      justifyContent={'space-around'}
      alignItems={'flex-end'}>
      <CircleButton
        bgColor="#ffff"
        circleSize="78px"
        icon="close"
        iconColor="#F27121"
        iconSize={25}
        onPress={handleClose}
      />
      <CircleButton
        bgColor="#AF0DBD"
        circleSize="99px"
        icon="heart"
        iconColor="#ffff"
        iconSize={42}
        onPress={handleHeart}
      />
      <CircleButton
        bgColor="#ffff"
        circleSize="78px"
        icon="star"
        iconColor="#AF0DBD"
        iconSize={25}
        onPress={handleStar}
      />
    </HStack>
  );
}
