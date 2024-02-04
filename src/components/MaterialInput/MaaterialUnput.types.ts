import {
  InputProps,
  TextProps,
  VStackProps,
} from '../../types/native-base.types';

export type fieldNames = 'input' | 'label';

export interface InputHeights {
  [key: fieldNames]: number;
}

export interface IMaterialInputProps extends InputProps {
  label: string;
  labelStyle?: TextProps;
  containerStyle?: VStackProps;
  errorMessage?: string;
}

export enum ELabelPosition {
  top = 1,
  bottom = 0,
}
