export interface IDatePickerComponent {
    date: string;
    open: boolean;
    setOpen: (modalOpen: boolean) => void;
    setDate: (date: string) => void;
    themeColor?: string;
}
