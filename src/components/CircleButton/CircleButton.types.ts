import {PressableProps} from '../../types/native-base.types';

export interface ICircleButton extends PressableProps {
  bgColor: string;
  circleSize: string;
  iconSize: number;
  iconColor: string;
  icon: JSX.Element | string;
}
