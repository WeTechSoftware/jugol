export interface ILikedProfileGalleryCard {
    galleryPicture: IGallery[];
}

export interface IGallery {
    __v: number;
    _id: string;
    createdAt: string;
    fieldName: string;
    image: string;
    updatedAt: string;
    user: string;
    originalName: string;
}

