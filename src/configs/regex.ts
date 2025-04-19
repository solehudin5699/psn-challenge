export const PASSWORD = new RegExp(
  /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)[\w!"#$%&'()*+,-./:;<=>?@[\\\]^`{|}~]{8,15}$/
);
export const PHONE = new RegExp(/^[086]([\d]{8,})$/i);
export const LENGTH_PASSWORD = new RegExp(/^[\S]{8,15}$/i);
export const UPPER_LOWER_CASE = new RegExp(/^(?=.*[a-z])(?=.*[A-Z]).+$/);
export const NUMBER_LETTER = new RegExp(/^(?=.*[0-9])(?=.*[a-zA-Z]).+$/);
export const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
