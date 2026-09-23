/**
 * Hackathon Rules & Guidelines Data
 */
export const HACKATHON_DATA = {
  title: 'FOUNDRIX ONLINE HACKATHON 2026',
  tagline: 'Build Online. Pitch on Stage. Win Big.',
  lockDeadline: '4 October 2026, 11:59 PM',
  pitchDate: '9 October 2026 (Day 1)',
  teamSize: '3 to 4 Members Strictly',
  
  rules: [
    {
      title: 'Mandatory Team Size (3 to 4 Members)',
      description: 'Solo submissions or 2-member teams are strictly NOT permitted. Every team must have a minimum of 3 and a maximum of 4 registered participants.'
    },
    {
      title: 'Individual Registration Prerequisite',
      description: 'Every team member must be registered individually with their own Registration ID (FDX-XXX) and fee paid (₹799 per head).'
    },
    {
      title: 'Hard Locking Deadline: 4 October 2026',
      description: 'Teams can create, join, leave, or modify rosters up until 4 October 2026 at 11:59 PM. After this deadline, all teams are locked permanently. Unformed or under-capacity teams (<3 members) will be disqualified from evaluation.'
    },
    {
      title: 'Build Phase & Prototype Submission',
      description: 'Teams are provided a building window prior to the event to engineer working software or hardware solutions based on the official problem statements.'
    },
    {
      title: 'Live Pitch & Demo on Day 1 (9 October)',
      description: 'Teams will present their working prototype and pitch deck live in front of the jury on Day 1 at Raghu Engineering College.'
    }
  ],

  evaluationCriteria: [
    { name: 'Problem Relevance & Innovation', weight: '25%', desc: 'Significance of the problem tackled and novelty of approach.' },
    { name: 'Technical Execution & Architecture', weight: '30%', desc: 'Functionality, code quality, design structure, and working prototype.' },
    { name: 'Business Viability & Feasibility', weight: '25%', desc: 'Market potential, scalability, and go-to-market clarity.' },
    { name: 'Pitch & Q&A Defense', weight: '20%', desc: 'Communication clarity, demonstration confidence, and responses to jury queries.' }
  ]
};

export default HACKATHON_DATA;
