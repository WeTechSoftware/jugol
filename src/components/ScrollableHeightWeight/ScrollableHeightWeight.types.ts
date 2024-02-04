export interface IScrollableHeightWeight {
    isOpen: boolean;
    setIsOpen: (value: boolean) => void;
    setValue: (value: string | number) => void;
    value: string;
    title: string;
    data: string[];
}