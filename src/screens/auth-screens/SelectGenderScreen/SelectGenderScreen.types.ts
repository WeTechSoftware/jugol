export enum EGender {
  M = 'Male',
  F = 'Female',
  O = 'Other',
}

export interface IGender {
  id: string;
  value: EGender;
}
