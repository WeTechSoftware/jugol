
import { ILikedItem } from '../LikedCardList/LikedCardList.types';
export interface ILikedCard {
    item: ILikedItem;
    type: string;
    isPremium?: boolean;
}
