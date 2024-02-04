import { InputProps } from '../../types/native-base.types';
import { Input, Text, VStack } from 'native-base';
import React, { useEffect, useState } from 'react';
import {
  LayoutChangeEvent,
  NativeSyntheticEvent,
  StyleSheet,
  TextInputFocusEventData,
} from 'react-native';

import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';
import {
  ELabelPosition,
  fieldNames,
  IMaterialInputProps,
} from '../MaterialInput/MaaterialUnput.types';
import MaterialError from '../MaterialInput/MaterialError';

const INPUT_LABEL_PADDING_LEFT = 15;

function MaterialTextArea(
  {
    label,
    labelStyle,
    containerStyle,
    onFocus,
    onBlur,
    onChangeText,
    errorMessage,
    value,
    ...rest
  }: IMaterialInputProps,
  ref: InputProps,
) {
  const showLabel = useSharedValue<number>(0);
  const inputElementsHeight = useSharedValue(0);
  const labelElementsHeight = useSharedValue(0);
  const inputValueRef = React.useRef<string>('');
  const [isHasValue, setHasValue] = useState<boolean>(false);

  const hasValue = value && value.length > 0;

  const labelPosition = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      marginLeft:
        showLabel.value === ELabelPosition.top
          ? INPUT_LABEL_PADDING_LEFT + 5
          : INPUT_LABEL_PADDING_LEFT,
      top: showLabel.value === ELabelPosition.top || isHasValue ? -11 : 15,
      backgroundColor: '#fff',
    };
  });

  const inputLayoutChange = (e: LayoutChangeEvent, fieldName: fieldNames) => {
    const { height } = e.nativeEvent.layout;
    if (fieldName === 'input') {
      inputElementsHeight.value = withTiming(height);
    }
    if (fieldName === 'label') {
      labelElementsHeight.value = withTiming(height);
    }
  };

  const handLeChange = (text: string) => {
    inputValueRef.current = text;
    onChangeText?.(text);
  };

  const handleFocus = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onFocus?.(e);
    if (inputValueRef.current.length > 0) {
      return;
    }
    showLabel.value = withTiming(ELabelPosition.top);
  };

  const handleBlur = (e: NativeSyntheticEvent<TextInputFocusEventData>) => {
    onBlur?.(e);

    if (inputValueRef.current.length > 0) {
      return;
    }
    showLabel.value = withTiming(ELabelPosition.bottom);
  };

  useEffect(() => {
    if (value) {
      setHasValue(true);
    }
  }, [value])

  return (
    <VStack mt={5} space={'3px'}>
      <VStack position={'relative'} {...containerStyle}>
        <Animated.View
          pointerEvents={'none'}
          style={[labelPosition, styles.labelBg]}>
          <Text
            color={'#00000060'}
            {...labelStyle}
            onLayout={(e: LayoutChangeEvent) => inputLayoutChange(e, 'label')}>
            {label}
          </Text>
        </Animated.View>
        <Input
          ref={ref}
          value={value}
          textAlignVertical={'top'}
          h={'150px'}
          onFocus={handleFocus}
          onBlur={handleBlur}
          onChangeText={handLeChange}
          onLayout={(e: LayoutChangeEvent) => inputLayoutChange(e, 'input')}
          style={styles.input}
          {...rest}
        />
      </VStack>
      {errorMessage ? <MaterialError errorMessage={errorMessage} /> : null}
    </VStack>
  );
}

export default React.forwardRef(MaterialTextArea);

const styles = StyleSheet.create({
  labelBg: {
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    zIndex: 1,
    marginLeft: INPUT_LABEL_PADDING_LEFT,
  },
  input: {
    paddingLeft: INPUT_LABEL_PADDING_LEFT,
  },
});
