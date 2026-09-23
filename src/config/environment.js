/**
 * Environment & Application Configuration
 */
export const CONFIG = {
  // Deployed Google Apps Script Web App Endpoint
  GOOGLE_SCRIPT_URL: import.meta.env.VITE_GOOGLE_SCRIPT_URL || 'https://script.google.com/macros/s/AKfycbwpaJnFfKXEfAKVrciD4L8EVypwFS881vECSjUKB3lj2kaf7No66dEgQ-bSqoy8Ovbs/exec',
  
  // Event Details
  EVENT_NAME: 'FOUNDRIX 2026',
  EVENT_TAGLINE: 'Flagship Startup & Tech Summit',
  EVENT_DATES: '9–10 October 2026',
  ORGANIZER: 'Students of Raghu Engineering College',
  ASSOCIATION: 'Raghu Engineering College',
  VENUE_NAME: 'Raghu Engineering College',
  VENUE_LOCATION: 'Dakamarri, Bheemunipatnam, Visakhapatnam, Andhra Pradesh',
  
  // UPI Payment Details
  UPI_ID: '9391183459@ybl',
  UPI_PAYEE_NAME: 'Raghu Engineering College',
  UPI_QR_IMAGE: '/assets/upi-qr.png',

  // Official Delegates WhatsApp Community
  WHATSAPP_GROUP_URL: 'https://chat.whatsapp.com/LtSa3ftDjZT7jmwGwK4nUM',
  
  // Early Bird Perk
  MAX_EARLY_BIRD_SPOTS: 200,
  EARLY_BIRD_INSTITUTE: 'E-Cell, IIT Delhi',
  
  // Hackathon Deadlines
  HACKATHON_TEAM_LOCK_DEADLINE: '2026-10-04T23:59:59+05:30',
  HACKATHON_UNDER_CAPACITY_ALERT_DATE: '2026-10-03',
  HACKATHON_PITCH_DATE: '9 October 2026',
  
  // Coordinators
  COORDINATORS: [
    { name: 'Tarun', phone: '+917989313442', displayPhone: '+91 79893 13442', role: 'Student Coordinator' },
    { name: 'Thanu', phone: '+919346565707', displayPhone: '+91 93465 65707', role: 'Student Coordinator' }
  ]
};

export default CONFIG;
