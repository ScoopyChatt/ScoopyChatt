// Shared checks for the phone and zip fields on every lead form, so the quote form,
// the doggy door forms and the contact form all accept and reject the same input.

// A US phone number: 10 digits, or 11 with a leading 1, with a real-looking area code. Formatting characters
// (spaces, dashes, dots, parentheses, a leading +) are ignored.
export const isValidUsPhone = (value) => {
  let digits = String(value || '').replace(/\D/g, '');
  if (digits.length === 11 && digits.startsWith('1')) digits = digits.slice(1);
  // US area codes and exchanges never start with 0 or 1.
  return /^[2-9]\d{2}[2-9]\d{6}$/.test(digits);
};

export const PHONE_ERROR = 'Enter a 10-digit US phone number';

export const isValidZip = (value) => /^\d{5}$/.test(String(value || '').trim());

export const ZIP_ERROR = 'Enter a 5-digit zip code';

export const isValidEmail = (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(String(value || '').trim());

// Formats a US number as the person types: (423) 555-0100. Stops at 10 digits
// (11 with a leading 1) so extra digits can't be typed in.
export const formatUsPhone = (value) => {
  let digits = String(value || '').replace(/\D/g, '');
  const country = digits.length > 10 && digits.startsWith('1') ? '1 ' : '';
  if (country) digits = digits.slice(1);
  digits = digits.slice(0, 10);
  if (digits.length < 4) return country + digits;
  if (digits.length < 7) return country + '(' + digits.slice(0, 3) + ') ' + digits.slice(3);
  return country + '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
};

// Common misspellings of the big email domains. Returns the corrected address, or null.
const DOMAIN_FIXES = {
  'gmial.com': 'gmail.com', 'gamil.com': 'gmail.com', 'gmai.com': 'gmail.com', 'gmail.co': 'gmail.com',
  'gmail.con': 'gmail.com', 'gnail.com': 'gmail.com', 'gmaill.com': 'gmail.com', 'gmal.com': 'gmail.com',
  'yahooo.com': 'yahoo.com', 'yaho.com': 'yahoo.com', 'yahoo.co': 'yahoo.com', 'yahoo.con': 'yahoo.com',
  'hotmial.com': 'hotmail.com', 'hotmal.com': 'hotmail.com', 'hotmail.co': 'hotmail.com', 'hotmail.con': 'hotmail.com',
  'outlok.com': 'outlook.com', 'outloo.com': 'outlook.com', 'outlook.co': 'outlook.com', 'outlook.con': 'outlook.com',
  'icloud.co': 'icloud.com', 'iclod.com': 'icloud.com', 'icoud.com': 'icloud.com', 'icloud.con': 'icloud.com',
  'aol.co': 'aol.com', 'aol.con': 'aol.com', 'comcast.ner': 'comcast.net', 'att.ner': 'att.net',
};

export const emailTypoSuggestion = (value) => {
  const email = String(value || '').trim().toLowerCase();
  const at = email.lastIndexOf('@');
  if (at < 1) return null;
  const fix = DOMAIN_FIXES[email.slice(at + 1)];
  return fix ? email.slice(0, at + 1) + fix : null;
};
