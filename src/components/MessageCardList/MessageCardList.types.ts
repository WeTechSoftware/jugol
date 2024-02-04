/* eslint-disable prettier/prettier */
export interface ImageCard {
  id: string;
  firstName: string;
  lastName: string;
  fullName: string;
  isActive: boolean;
  timeStamp: Date;
  recentText: string;
  avatarUrl: string;
}

export interface ImageCardList {
  data: ImageCard[];
}
