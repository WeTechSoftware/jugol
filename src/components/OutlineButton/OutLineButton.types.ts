import {VIcon} from '@/types/common.types';
import {PressableProps, TextProps} from '../../types/native-base.types';

export interface IOutLineButton extends PressableProps {
  placeholder: string;
  value: string;
  placeholderTextProps?: TextProps;
  valueTextProps?: TextProps;
  iconStyle?: VIcon;
}
