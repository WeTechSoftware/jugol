import dayjs from 'dayjs';
import {Text, VStack} from 'native-base';
import React from 'react';
import {fontSizes} from '../../theme-config/typography';

export default function CalendarHeader({date = new Date()}: {date: Date}) {
  const localDate = dayjs(date).format('MMMM');
  const localYear = dayjs(date).format('YYYY');

  return (
    <VStack justifyContent={'center'} mb={4}>
      <Text textAlign={'center'}>Birthday</Text>
      <Text
        fontSize={fontSizes['2xl']}
        fontWeight={'bold'}
        color={'primary.100'}
        textAlign={'center'}>
        {localYear}
      </Text>
      <Text color={'primary.100'} textAlign={'center'}>
        {localDate}
      </Text>
    </VStack>
  );
}
