import { Pressable } from 'native-base';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { FilterIcon } from '@assets/svg/icons';

interface IRouteName {
  routeName: string;
}

export default function FilterButton({ routeName }: IRouteName) {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => navigation.navigate(routeName as never)}
      // mr={'20px'}
      borderWidth={'1px'}
      borderColor="#E8E6EA"
      h={'45px'}
      w={'45px'}
      borderRadius={'15px'}
      alignItems={'center'}
      justifyContent={'center'}>
      <FilterIcon />
    </Pressable>
  );
}
