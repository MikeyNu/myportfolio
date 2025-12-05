// Calendly Configuration
// Update this URL after setting up your Calendly account at https://calendly.com

export const CALENDLY_CONFIG = {
  // Your Calendly scheduling URL
  // Format: https://calendly.com/your-username/15min
  bookingUrl: 'https://calendly.com/mikeynu/15-min-intro-call',
  
  // Prefill parameters (optional)
  getPrefillUrl: (name?: string, email?: string) => {
    const url = new URL(CALENDLY_CONFIG.bookingUrl);
    if (name) url.searchParams.set('name', name);
    if (email) url.searchParams.set('email', email);
    return url.toString();
  }
};

// Helper function to open Calendly in a new tab
export const openCalendly = (name?: string, email?: string) => {
  const url = CALENDLY_CONFIG.getPrefillUrl(name, email);
  window.open(url, '_blank', 'noopener,noreferrer');
};
