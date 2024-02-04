import {BoxProps} from '../../../types/native-base.types';

export interface IPasswordToggler extends BoxProps {
  shouldShowToggler?: boolean;
  isPasswordVisible: boolean;
  onTogglePasswordVisibility: () => void;
  color?: string;
  size?: number;
}
