import {StyleSheet} from 'react-native';
import React from 'react';
import {IPagination} from './Pagination.types';
import Animated, {
  useAnimatedStyle,
  interpolate,
  Extrapolate,
} from 'react-native-reanimated';
import {View} from 'native-base';
const Pagination = ({data, x, size}: IPagination) => {
  return (
    <View style={styles.paginationContainer}>
      {data.map((_, i) => {
        // eslint-disable-next-line react-hooks/rules-of-hooks
        const animatedDotStyle = useAnimatedStyle(() => {
          const widthAnimation = interpolate(
            x.value,
            [(i + 2) * size, (i + 3) * size, (i + 3) * size],
            [10, 20, 10],
            Extrapolate.CLAMP,
          );
          const opacityAnimation = interpolate(
            x.value,
            [(i - 1) * size, i * size, (i + 1) * size],
            [0.3, 1, 0.3],
            Extrapolate.CLAMP,
          );
          return {
            width: widthAnimation,
            opacity: opacityAnimation,
          };
        });
        return (
          <Animated.View style={[styles.dots, animatedDotStyle]} key={i} />
        );
      })}
    </View>
  );
};

export default Pagination;

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: 'row',
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  dots: {
    height: 10,
    backgroundColor: '#AF0DBD',
    marginHorizontal: 10,
    borderRadius: 5,
  },
});
