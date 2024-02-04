import {CountryInfo} from 'react-native-country-picker-modal/lib/CountryService';

export interface IInitialValues {
  addressLine1?: string;
  addressLine2?: string;
  cityName: string;
  postCode?: string;
  profession: string;
  religion: string;
  userAbout?: string;
  countryName: string;
  country: CountryInfo | null;
}
