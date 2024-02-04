import {InputProps} from '../../types/native-base.types';

export interface ICountryWithCode {
  dialingCode: string;
  countryCode: string;
  phoneNumber: string;
}

export interface IPhoneInputProps extends InputProps {
  setPhoneInfo: (info: ICountryWithCode) => void;
  errorMessage?: string | null;
}
