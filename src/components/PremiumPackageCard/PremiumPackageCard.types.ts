
import { PressableProps } from '../../types/native-base.types';
export interface IPremiumPackageCard extends PressableProps {
    price: string;
    duration: string;
    isSelected: boolean;
}
