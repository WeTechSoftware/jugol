

export interface IRenderGalleryImage {
    picture: string | any;
    index: number;
    selectedImage: number;
    handelImage: (index: number) => void;
}
