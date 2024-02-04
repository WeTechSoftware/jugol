import {Text} from 'native-base';
import React from 'react';
import {IBioText} from './BioText.types';

export default function BioText({title}: IBioText) {
  return (
    <Text fontSize="sm" my="4px" color="#3C3B3D" py="4px" fontWeight={300}>
      {title}
    </Text>
  );
}
