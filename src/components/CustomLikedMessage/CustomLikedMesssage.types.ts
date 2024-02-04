
import { ILikedItem } from '../LikedCardList/LikedCardList.types';
export interface ICustomLikedMessage {
    user: ILikedItem;
    isOpen: boolean;
    onClose: () => void;
}
