export const getUserAge = (dob: Date) => {
  const birthDate = new Date(dob); 
  const difference = Date.now() - birthDate.getTime();
  const age = new Date(difference);

  return Math.abs(age.getUTCFullYear() - 1970);
}