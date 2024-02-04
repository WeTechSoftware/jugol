import { ButtonProps } from "@types/native-base.types";


export interface ISocialIconButtonProps extends ButtonProps {
  icon: 'google' | 'facebook-square' | 'apple1';
  color?: string;
  size?: number;
}
