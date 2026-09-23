/**
 * Core Event Data & Copy for FOUNDRIX 2026
 * Hosted by Students of Raghu Engineering College in association with E-Cell IIT Bombay
 */
export const EVENT_DATA = {
  hero: {
    badge: 'Flagship Student Tech & Startup Summit',
    association: 'Hosted by Students of Raghu Engineering College × E-Cell IIT Bombay / NEC',
    titleLine1: 'FOUNDRIX 2026',
    titleLine2: 'THE TECH SUMMIT',
    subtitle: 'Students of Raghu Engineering College present a high-octane 2-day ecosystem summit bringing together young founders, developers, innovators, and collegiate leaders.',
    dates: '9–10 October 2026',
    venue: 'Raghu Engineering College Campus, Visakhapatnam',
    targetDate: '2026-10-09T09:00:00+05:30', // Countdown target
  },
  
  earlyBird: {
    title: 'EXCLUSIVE EARLY BIRD PERK',
    tagline: 'First 200 Registrations receive an official Certificate from E-Cell, IIT Delhi!',
    institute: 'E-Cell, IIT Delhi',
    maxSpots: 200,
  },

  pass: {
    title: 'ALL-IN-ONE PASS',
    price: 799,
    unit: 'per head',
    badge: 'EVERYTHING INCLUDED',
    description: 'One single all-inclusive pass unlocking the complete 2-day Foundrix experience. No separate event tickets or hidden fees.',
    features: [
      'Full Entry to the 2-Day In-Person Workshop at Raghu Engineering College',
      'Entry into the Online Hackathon Sprint with Day 1 Live Pitch & Evaluation',
      'Exclusive Official Foundrix Swags & Merch Kit (Stickers, Badge, Swag Bag)',
      'Access to create or join a 3–4 Member Hackathon Team before Oct 4',
      'Official Verified Participation & Achievement Certificates',
      'Access to all Main Stage Keynotes, Networking Lounges & Live Demos',
      'Eligibility for Hackathon Cash Prizes & Institutional Recognitions'
    ],
    ctaText: 'RESERVE YOUR PASS — ₹799'
  },

  events: [
    {
      id: 'hackathon',
      badge: 'ONLINE BUILD SPRINT + ON-CAMPUS PITCH',
      title: 'ONLINE HACKATHON 2026',
      summary: 'A fast-paced problem-solving sprint. Build cutting-edge solutions, submit your prototype, and pitch live to an expert jury on Day 1.',
      perks: [
        'Team Size: 3 to 4 Members Strictly',
        'Build Phase Sprint with Dedicated Problem Statements',
        'Live Pitch Explanation & Evaluation on Day 1 (9 Oct)',
        'Teams locked permanently on 4 October at 11:59 PM',
        'Lucrative Cash Prizes & Special Categorical Awards'
      ],
      ctaText: 'HACKATHON TEAM HUB',
      accentColor: '#146ef5'
    },
    {
      id: 'workshop',
      badge: '2-DAY IN-PERSON IMMERSION',
      title: 'ENTREPRENEURSHIP WORKSHOP',
      summary: 'A continuous, hands-on masterclass taking students from problem discovery to business models, validation, and venture creation.',
      perks: [
        'Interactive Sessions on Mindset & Market Opportunities',
        'Frameworks for Idea Validation & Go-To-Market Execution',
        'Real-world Case Studies, Unit Economics & Pitch Practice',
        'Official Participation Certificate from Organizers',
        'Hands-on Frameworks & Venture Pitch Feedback on Campus'
      ],
      ctaText: 'REGISTER FOR PASS',
      accentColor: '#00f0ff'
    }
  ],

  venueInfo: {
    title: 'CAMPUS VENUE',
    subtitle: 'Proudly hosted by the student organizers of Raghu Engineering College at our campus in Visakhapatnam.',
    collegeName: 'Raghu Engineering College (Autonomous)',
    address: 'Dakamarri, Bheemunipatnam Mandal, Visakhapatnam, Andhra Pradesh — 531162',
    accreditation: 'Autonomous Institution • NBA Re-Accredited • NAAC A+ Grade',
    facilities: [
      'Centrally Air-Conditioned Presentation Theatres & Seminar Halls',
      'High-Speed Gigabit Campus Wi-Fi & Power Stations',
      'Dedicated Startup Incubation Center & Hackathon Pitch Arena',
      'Sprawling Green Campus with Modern Amenities'
    ],
    note: 'Logistics and local arrival advisories will be sent directly to all registered participants closer to the summit date.'
  },

  faqs: [
    {
      q: 'What is included in the ₹799 registration fee?',
      a: 'The ₹799 pass is flat and all-inclusive per participant. It grants full entry to the 2-Day In-Person Workshop at Raghu Engineering College, entry into the Online Hackathon, official Foundrix Swags & Merch Kit, certificates, and delegate sessions.'
    },
    {
      q: 'How does the E-Cell, IIT Delhi certificate offer work?',
      a: 'The first 200 registered students automatically qualify for an official certificate from E-Cell, IIT Delhi! Our server tracks verified transactions live, and the offer automatically locks once the 200 spots are filled.'
    },
    {
      q: 'How do we form a Hackathon team of 3 to 4 members?',
      a: 'Each student registers individually for ₹799 and receives a Registration ID (e.g. FDX-101). Next, any registered student can visit the Hackathon Team Hub on this website, enter their Registration ID, and create a team to become Team Lead. The system generates a 6-digit Team Code (e.g. FDX-101) which up to 3 registered friends can enter to join.'
    },
    {
      q: 'What is the last date to update or change Hackathon teams?',
      a: 'Teams can be formed, joined, or modified only until 4 October 2026, 11:59 PM. After this hard deadline, teams are strictly locked. If a team has fewer than 3 members by 3 October, an email reminder will be sent to complete the roster.'
    },
    {
      q: 'When and where is the Hackathon pitch evaluation held?',
      a: 'The build phase happens online leading up to the summit. All teams will deliver their live project demonstration, pitch explanation, and undergo jury evaluation on Day 1 (9 October 2026) at Raghu Engineering College.'
    },
    {
      q: 'Where is the event hosted and how will venue logistics be shared?',
      a: 'FOUNDRIX 2026 is proudly hosted on-campus by the students of Raghu Engineering College (NEC Team, REC). Detailed campus entry instructions and logistics updates will be emailed to registered delegates before the summit.'
    },
    {
      q: 'How will I receive confirmation after payment?',
      a: 'Once you submit your 12-digit UTR and payment screenshot proof, our student coordination desk verifies the transaction within 12 hours and sends an official confirmation email containing your pass and hackathon details.'
    }
  ],

  coordinators: [
    {
      name: 'Tarun',
      role: 'Lead Student Coordinator',
      phone: '+91 79893 13442',
      cleanPhone: '917989313442',
      email: 'tarun.foundrix@gmail.com'
    },
    {
      name: 'Thanu',
      role: 'Lead Student Coordinator',
      phone: '+91 93465 65707',
      cleanPhone: '919346565707',
      email: 'thanu.foundrix@gmail.com'
    }
  ]
};
