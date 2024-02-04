
import { CountryInfo } from 'react-native-country-picker-modal/lib/CountryService';

export interface IFilterInitialValues {
    gender: string;
    ageTo: string;
    ageFrom: string;
    cityName: string;
    profession: string;
    religion: string;
    countryName: string;
    country: CountryInfo | null;
}
