/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import SwitchToggle from 'react-native-switch-toggle';
import {ICustomToggleButton} from './CustomToggleButton.types';

export default function CustomToggleButton({
  isShow,
  handleToggle,
}: ICustomToggleButton) {
  return (
    <SwitchToggle
      switchOn={isShow}
      onPress={handleToggle}
      circleColorOff="#E8E8E8"
      circleColorOn="#AF0DBD"
      backgroundColorOn="#F7E7F8"
      backgroundColorOff="#D2D2D2"
      backTextLeft="Show"
      backTextRight="Hide"
      textLeftStyle={
        !isShow
          ? {display: 'none', marginRight: 0}
          : {
              position: 'absolute',
              top: -8,
              left: 6,
              fontSize: 10,
              color: '#AF0DBD',
            }
      }
      textRightStyle={
        isShow
          ? {display: 'none'}
          : {
              position: 'absolute',
              top: -8,
              left: 6,
              fontSize: 10,
              color: '#747474',
            }
      }
      containerStyle={{
        width: 60,
        height: 22,
        borderRadius: 11,
        padding: 1,
        position: 'relative',
      }}
      circleStyle={{
        width: 23,
        height: 23,
        borderRadius: 12,
      }}
    />
  );
}
