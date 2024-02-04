import {Divider, HStack, Text} from 'native-base';
import React from 'react';

export default function DayBreakDivider({day}: {day: string}) {
  return (
    <HStack alignItems={'center'} justifyContent={'center'} mb={'10px'}>
      <Divider />
      <Text
        position={'absolute'}
        bg="white"
        color="dark.200"
        p={'2px'}
        fontSize={'12px'}>
        {day}
      </Text>
    </HStack>
  );
}
