import {VStackProps, TextProps} from '../../../types/native-base.types';

export interface IAuthHeader extends VStackProps {
  title: string;
  subTitle?: string;
  titleStyle?: TextProps;
  subTitleStyle?: TextProps;
}
