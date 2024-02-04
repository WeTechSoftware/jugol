import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import {TextProps, VStackProps} from '../../types/native-base.types';

type MaterialErrorProps = React.ComponentProps<typeof MaterialIcons>;

export interface IMaterialErrorProps extends VStackProps {
  errorMessage?: string;
  textProps?: TextProps;
  iconProps?: MaterialErrorProps;
}
