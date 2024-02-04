import {SheetProps} from 'react-native-actions-sheet';

type OmittedSheetProps = Omit<SheetProps, 'sheetId'>;

export interface IDateSelectorSheetProps extends OmittedSheetProps {
  sId?: string;
  setDate?: (date: Date) => void;
}
