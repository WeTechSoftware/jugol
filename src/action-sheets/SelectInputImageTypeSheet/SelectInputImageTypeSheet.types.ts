import { IIMagePickerProps } from '@hooks/useImagePicker.types';
import { ImagePickerResponse } from 'react-native-image-picker';

export interface ISelectInputImageTypeSheetProps extends IIMagePickerProps {
  sId?: string;
  setAsset?: (asset: ImagePickerResponse) => void;
  createAccount?: boolean;
}
