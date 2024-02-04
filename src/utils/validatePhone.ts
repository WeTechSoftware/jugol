import parsePhoneNumber, {
  CountryCode,
  isValidPhoneNumber,
} from 'libphonenumber-js';

export const removeBrackets = (str: string) => str.replace(/[\(\)]/g, '');

const validatePhone = (
  phoneNumber: string = '',
  dialingCode: string = '+880',
  code: CountryCode = 'BD',
): boolean => {
  const phone = parsePhoneNumber(dialingCode + phoneNumber, code)
    ?.formatNational()
    .replace(' ', '-');

  const dialingCodeWithoutBrackets = removeBrackets(dialingCode);

  const isPhoneNumber = isValidPhoneNumber(
    `${dialingCodeWithoutBrackets} ${phone}`,
    code,
  );

  return !isPhoneNumber;
};

export default validatePhone;
