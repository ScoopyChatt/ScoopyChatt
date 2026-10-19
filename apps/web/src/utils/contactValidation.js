// Shared checks for the phone and zip fields on every lead form, so the quote form,
// the doggy door forms and the contact form all accept and reject the same input.

// A US phone number: 10 digits, or 11 with a leading 1. Formatting characters
// (spaces, dashes, dots, parentheses, a leading +) are ignored.
export const isValidUsPhone = (value) => {
  const digits = String(value || '').replace(/\D/g, '');
  return digits.length === 10 || (digits.length === 11 && digits.startsWith('1'));
};

export const PHONE_ERROR = 'Enter a 10-digit US phone number';

export const isValidZip = (value) => /^\d{5}$/.test(String(value || '').trim());

export const ZIP_ERROR = 'Enter a 5-digit zip code';

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || '').trim());
