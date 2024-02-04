import colors from '@colors';
import {Modal, Pressable, Text, VStack} from 'native-base';
import React, {Component} from 'react';
import ScrollPicker from 'react-native-wheel-scrollview-picker';
import {IScrollableHeightWeight} from './ScrollableHeightWeight.types';

const ScrollableHeightWeight = ({
  isOpen,
  setIsOpen,
  setValue,
  value,
  title,
  data,
}: IScrollableHeightWeight) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      justifyContent="center"
      alignItems="center">
      <VStack
        h="220px"
        w="70%"
        bg="white"
        px="40px"
        borderRadius="15px"
        overflow="hidden">
        <Text
          position="absolute"
          top={-15}
          zIndex={10}
          color={colors.primary[100]}
          fontSize="lg"
          p="20px">
          {title}
        </Text>
        <ScrollPicker
          dataSource={data}
          selectedIndex={data.indexOf(value)}
          renderItem={(item, index) => {
            return (
              <Text
                fontSize={data.indexOf(value) === index ? 'lg' : 'sm'}
                fontWeight={data.indexOf(value) === index ? 500 : 400}
                color={
                  data.indexOf(value) === index
                    ? colors.primary[100]
                    : 'gray.300'
                }>
                {item}
              </Text>
            );
          }}
          onValueChange={(item, selectedIndex) => {
            setValue(item);
          }}
          wrapperHeight={220}
          wrapperColor="#FFFFFF"
          itemHeight={60}
          highlightColor="#d8d8d8"
          highlightBorderWidth={1.5}
        />
        <Pressable
          position="absolute"
          bottom={0}
          right={0}
          bg="white"
          w="full"
          flexDirection="row"
          justifyContent="flex-end"
          onPress={() => setIsOpen(false)}>
          <Text
            position="absolute"
            bottom={-15}
            color={colors.primary[100]}
            fontSize="lg"
            p="20px">
            OK
          </Text>
        </Pressable>
      </VStack>
    </Modal>
  );
};

export default ScrollableHeightWeight;
