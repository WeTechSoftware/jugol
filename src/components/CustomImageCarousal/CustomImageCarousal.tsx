/* eslint-disable react-hooks/rules-of-hooks */
import { Button, Image, Stack, Text, VStack } from 'native-base';
import React, { useEffect, useRef, useState } from 'react';
import { Dimensions, StyleSheet, useWindowDimensions } from 'react-native';
import Animated, {
  interpolate,
  useAnimatedRef, useAnimatedScrollHandler,
  useAnimatedStyle, useSharedValue
} from 'react-native-reanimated';
import Pagination from '../Pagination/Pagination';
import TextWithButton from '../TextWithButton/TextWithButton';
import { ICustomImageCarousal } from './CustomImageCarousal.types';
const CustomImageCarousal = ({
  data,
  autoPlay,
  pagination,
  handleSignInClick,
  handleSignupClick,
}: ICustomImageCarousal) => {
  const scrollViewRef = useAnimatedRef<any>();
  const interval = useRef();
  const [isAutoPlay, setIsAutoPlay] = useState(autoPlay);
  const offSet = useSharedValue(0);
  const [newData] = useState([
    { key: 'spacer-left' },
    ...data,
    { key: 'spacer-right' },
  ]);
  const { width } = useWindowDimensions();
  const SIZE = width * 0.7;
  const SPACER = (width - SIZE) / 2;
  const x = useSharedValue(0);

  const onScroll = useAnimatedScrollHandler({
    onScroll: event => {
      x.value = event.contentOffset.x;
    },
  });

  useEffect(() => {
    if (isAutoPlay === true) {
      let _offSet = offSet.value;
      interval.current = setInterval(() => {
        if (_offSet >= Math.floor(SIZE * (data.length - 1) - 10)) {
          _offSet = 0;
        } else {
          _offSet = Math.floor(_offSet + SIZE);
        }
        scrollViewRef.current.scrollTo({ x: _offSet, y: 0 });
      }, 2000);
    } else {
      clearInterval(interval.current);
    }
  }, [SIZE, SPACER, isAutoPlay, data.length, offSet.value, scrollViewRef]);

  return (
    <VStack mt={'40px'}>
      <Animated.ScrollView
        ref={scrollViewRef}
        onScroll={onScroll}
        onScrollBeginDrag={() => {
          setIsAutoPlay(false);
        }}
        onMomentumScrollEnd={e => {
          offSet.value = e.nativeEvent.contentOffset.x;
          setIsAutoPlay(autoPlay);
        }}
        scrollEventThrottle={16}
        decelerationRate="fast"
        snapToInterval={SIZE}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}>
        {newData.map((item, index) => {
          const style = useAnimatedStyle(() => {
            const scale = interpolate(
              x.value,
              [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
              [0.8, 1, 0.8],
            );
            return {
              transform: [{ scale }],
            };
          });
          const style1 = useAnimatedStyle(() => {
            const scale = interpolate(
              x.value,
              [(index - 2) * SIZE, (index - 1) * SIZE, index * SIZE],
              [0, 1, 0],
            );
            return {
              transform: [{ scale }],
            };
          });
          if (!item.picture) {
            return <Stack style={{ width: SPACER }} key={index} />;
          }
          return (
            <VStack style={{ width: SIZE }} key={index} space={4}>
              <Animated.View style={[styles.imageContainer, style]}>
                <Image
                  source={item.picture}
                  alt="No Image"
                  style={styles.image}
                />
              </Animated.View>
              <Animated.View style={style1}>
                <Text
                  textAlign={'center'}
                  fontSize='2xl'
                  fontWeight={600}
                  color="primary.100">
                  {item.heading}
                </Text>
                <Text
                  mt={'10px'}
                  mb={'30px'}
                  color={'#323755'}
                  textAlign={'center'}>
                  {item.body}
                </Text>
              </Animated.View>
            </VStack>
          );
        })}
      </Animated.ScrollView>
      {pagination && <Pagination data={data} x={x} size={SIZE} />}
      <Button
        onPress={handleSignupClick}
        variant={'primary'}
        mt={'30px'}
        mx={'40px'}>
        Create an account
      </Button>
      <VStack alignItems={'center'} my={'20px'}>
        <TextWithButton
          buttonText="Sign In"
          msgText="Already have an account?"
          handleClick={handleSignInClick}
        />
      </VStack>
    </VStack>
  );
};

export default CustomImageCarousal;

const styles = StyleSheet.create({
  imageContainer: {
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: Dimensions.get('window').height / 2,
    aspectRatio: 1,
    resizeMode: 'cover'
  },
});
