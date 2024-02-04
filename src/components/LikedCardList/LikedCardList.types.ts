
export interface ILikedItem {
    _id: string;
    firstName: string;
    lastName: string;
    profilePic: string;
    birthDate: string | Date;
    status: string;
}

export interface ILikedCardList {
    data: ILikedItem[];
    type: string;
    isPremium?: boolean;
}
