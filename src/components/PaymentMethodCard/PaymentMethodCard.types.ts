
import { ImageSourcePropType } from 'react-native';
import { PressableProps, TextProps } from '../../types/native-base.types';
export interface IPaymentMethodCard extends PressableProps {
    image: ImageSourcePropType;
    title: string;
    titleStyle?: TextProps;
}
