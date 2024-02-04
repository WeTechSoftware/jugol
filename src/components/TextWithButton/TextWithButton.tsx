import React from 'react';
import {Pressable, Text} from 'native-base';
import {ITextWithButton} from './TextWithButton.type';

const TextWithButton = ({
  msgText,
  buttonText,
  handleClick,
}: ITextWithButton) => {
  return (
    <Pressable
      onPress={handleClick}
      ml={'13px'}
      display={'flex'}
      flexDirection={'row'}>
      <Text color={'dark.200'}>{msgText}</Text>
      <Text color={'primary.100'}> {buttonText}</Text>
    </Pressable>
  );
};

export default TextWithButton;
