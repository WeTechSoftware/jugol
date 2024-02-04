export interface ILoginProps {
  dialing_code: string;
  phone: string;
  password: string;
}

export interface IOtpVerify {
  dialing_code: string;
  phone: string;
  otp: string;
  id: string;
}

export interface IAddCard {
  card_name: string;
  card_number: string;
  expiry_month: string;
  expiry_year: string;
  cvv: string;
}

export interface IUpdateResidency {
  resident_id: string;
}

export type TResendOtp = Pick<IOtpVerify, 'dialing_code' | 'phone'>;
