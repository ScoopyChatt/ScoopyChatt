// Fires the "quote_submitted" dataLayer event that Google Tag Manager uses to count a
// Google Ads quote conversion. Call it ONLY after the lead webhook has accepted the
// submission, so empty, invalid, out-of-area or failed submits are never counted.
// lead_id becomes the conversion's transaction ID, so a double fire is deduplicated.
// user_data feeds Google's enhanced conversions (Google hashes it before sending).

const makeLeadId = () => {
  try {
    if (typeof crypto !== 'undefined' && crypto.randomUUID) return crypto.randomUUID();
  } catch (e) {
    // fall through
  }
  return 'lead-' + Date.now() + '-' + Math.random().toString(36).slice(2, 10);
};

const toE164 = (phone) => {
  const digits = String(phone || '').replace(/\D/g, '');
  if (digits.length === 10) return '+1' + digits;
  if (digits.length === 11 && digits.startsWith('1')) return '+' + digits;
  return '';
};

export const trackQuoteSubmitted = ({ email, phone, formName }) => {
  if (typeof window === 'undefined') return;
  try {
    const userData = {};
    const cleanEmail = String(email || '').trim().toLowerCase();
    if (cleanEmail) userData.email = cleanEmail;
    const cleanPhone = toE164(phone);
    if (cleanPhone) userData.phone_number = cleanPhone;

    window.dataLayer = window.dataLayer || [];
    // Enhanced conversions: the Google tag reads user_data set this way and hashes it.
    if (typeof window.gtag === 'function' && Object.keys(userData).length) {
      window.gtag('set', 'user_data', userData);
    }
    window.dataLayer.push({
      event: 'quote_submitted',
      lead_id: makeLeadId(),
      form_name: formName || 'quote',
      user_data: userData,
    });
  } catch (e) {
    // Tracking is best-effort; never break the form.
  }
};
