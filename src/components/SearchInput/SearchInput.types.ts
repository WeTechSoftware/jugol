import { InputProps } from '../../types/native-base.types';

export interface ISearchInput extends InputProps {
  searchText: string;
  handleSearchText: (text: string) => void;
}
