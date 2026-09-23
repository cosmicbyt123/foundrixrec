/**
 * Interactive 2-Day Schedule for FOUNDRIX 2026
 * Chronological order of sessions (timings omitted per host guidelines)
 */
export const SCHEDULE_DATA = {
  days: [
    {
      id: 'day1',
      dateLabel: 'DAY 1 — 9 OCTOBER 2026',
      sublabel: 'Online Hackathon Live Pitching & Entrepreneurship Workshop',
      badge: 'OCT 9',
      timeline: [
        {
          session: 'SESSION 01',
          title: 'ONLINE HACKATHON — LIVE PITCH & JURY EVALUATION',
          location: 'Main Digital Arena & Coding Center, REC Campus',
          description: 'Live prototype demos, architecture breakdown, and slide deck pitches directly before the evaluation jury.',
          type: 'Hackathon'
        },
        {
          session: 'SESSION 02',
          title: 'ENTREPRENEURSHIP WORKSHOP — PART 1',
          location: 'Seminar Hall, REC Campus',
          description: 'Hands-on problem discovery, founder frameworks, tech product validation, and venture architecture.',
          type: 'Workshop'
        }
      ]
    },
    {
      id: 'day2',
      dateLabel: 'DAY 2 — 10 OCTOBER 2026',
      sublabel: 'Advanced Workshop Masterclass & Venture Execution',
      badge: 'OCT 10',
      timeline: [
        {
          session: 'SESSION 01',
          title: 'ENTREPRENEURSHIP WORKSHOP — PART 2 & MASTERCLASS',
          location: 'Auditorium, REC Campus',
          description: 'Deep dive into go-to-market strategies, unit economics, tech scalability, and venture building sprint.',
          type: 'Workshop'
        }
      ]
    }
  ]
};
