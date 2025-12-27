export const sampleReviews = [
  "This app is amazing! The new feature is a game-changer.",
  "I'm having trouble with the login process. It keeps crashing.",
  "Could you add a dark mode? My eyes would appreciate it.",
  "The user interface is a bit confusing to navigate.",
  "Customer support was very helpful in resolving my issue.",
  "I wish there was a way to export my data to a CSV file.",
  "The app constantly freezes after the latest update.",
  "Dark theme please! It's a must-have feature these days.",
  "Performance has been sluggish lately, especially on older devices.",
  "I can't log in at all. The app crashes every time I try.",
];

export const initialTopicsForDeduplication = [
  "login issues",
  "app crashing",
  "dark mode request",
  "UI confusion",
  "data export feature",
  "slow performance",
  "login failure",
  "request for dark theme",
  "app freezes",
  "performance degradation",
];

// Generates an array of dates for the last N days
const generateDateHeaders = (days: number) => {
  const dates = [];
  for (let i = days - 1; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    dates.push(d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' }));
  }
  return dates;
};

export const trendReportHeaders = generateDateHeaders(7);

export const trendData = [
  {
    topic: "Login & Crash Issues",
    counts: [2, 1, 3, 0, 4, 2, 5],
    total: 17,
  },
  {
    topic: "Feature Request: Dark Mode",
    counts: [5, 6, 4, 7, 5, 8, 6],
    total: 41,
  },
  {
    topic: "Performance & Speed",
    counts: [1, 0, 2, 1, 3, 1, 2],
    total: 10,
  },
  {
    topic: "UI/UX Feedback",
    counts: [3, 2, 2, 4, 1, 3, 2],
    total: 17,
  },
  {
    topic: "Data Export Request",
    counts: [0, 1, 0, 2, 1, 0, 1],
    total: 5,
  },
  {
    topic: "Positive Feedback",
    counts: [8, 10, 9, 12, 11, 9, 13],
    total: 72,
  },
];
