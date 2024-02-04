import { BoxProps, HStackProps, TextProps } from '@types/native-base.types';

export interface IOrTextProps extends HStackProps {
  text?: string;
  textStyle?: TextProps;
  dividerStyle?: BoxProps;
}
