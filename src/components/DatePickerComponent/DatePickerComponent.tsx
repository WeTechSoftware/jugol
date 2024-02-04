import colors from '@colors';
import {Modal, VStack} from 'native-base';
import React from 'react';
import {useWindowDimensions} from 'react-native';
import {DatePicker} from 'react-native-common-date-picker';
import {IDatePickerComponent} from './DatePickerComponent.types';

export default function DatePickerComponent({
  open,
  date,
  setOpen,
  setDate,
  themeColor,
}: IDatePickerComponent) {
  const {width} = useWindowDimensions();
  return (
    <Modal isOpen={open} onClose={() => setOpen(false)} bg="rgba(0, 0, 0, 0.4)">
      <DatePicker
        titleText="Select Birthdate"
        titleStyle={{
          color: themeColor,
        }}
        width={width - 50}
        selectedRowBackgroundColor={colors.gray[100]}
        selectedTextColor={themeColor}
        confirm={(date: string) => {
          setOpen(false);
          setDate(date);
        }}
        cancel={() => setOpen(false)}
        defaultDate={date}
        maxDate={new Date()}
        minDate="1900/01/01"
      />
    </Modal>
  );
}
