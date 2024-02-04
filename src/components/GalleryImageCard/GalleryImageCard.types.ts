
import { IEditUserGallery } from '@screens/account-screens/EditUserGallery/EditUserGallery.types';
import { PressableProps } from '../../types/native-base.types';
export interface IGalleryImageCard extends PressableProps {
    iconSize: number;
    index: number;
    boxHeight: string;
    boxWidth: string;
    image: IEditUserGallery | undefined;
    images: IEditUserGallery[];
    fieldName: string;
    setImages: (image: any) => void;
    edit?: boolean;
}
