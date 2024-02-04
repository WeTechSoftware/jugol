import React from 'react';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import {VStackProps} from '../../types/native-base.types';

type IKeyBoardVStack = React.ComponentProps<typeof KeyboardAwareScrollView>;

export interface IKeyBoardVStackProps extends IKeyBoardVStack {
  rest?: any;
  containerStyle?: VStackProps;
  hideContainer?: boolean;
  children?: React.ReactNode;
}
