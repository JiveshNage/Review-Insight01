import type { ExtractTopicsFromReviewsOutput } from "@/ai/flows/extract-topics-from-reviews";
import type { DeduplicateSemanticallySimilarTopicsOutput } from "@/ai/flows/deduplicate-semantically-similar-topics";

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

export const extractedTopics: ExtractTopicsFromReviewsOutput = {
  topics: [
    { topic: "Positive feedback on new feature", reasoning: "User mentioned 'The new feature is a game-changer'." },
    { topic: "Login issues", reasoning: "User stated 'I'm having trouble with the login process'." },
    { topic: "App crashing", reasoning: "Review mentions 'It keeps crashing' and 'The app crashes every time I try'." },
    { topic: "Feature request: Dark mode", reasoning: "User asked 'Could you add a dark mode?' and 'Dark theme please!'." },
    { topic: "Confusing user interface", reasoning: "Feedback includes 'The user interface is a bit confusing to navigate'." },
    { topic: "Positive customer support experience", reasoning: "User said 'Customer support was very helpful'." },
    { topic: "Feature request: Data export", reasoning: "User wished for a way to 'export my data to a CSV file'." },
    { topic: "App freezes after update", reasoning: "A user reported 'The app constantly freezes after the latest update'." },
    { topic: "Slow performance", reasoning: "User complained that 'Performance has been sluggish lately'." },
  ]
};

export const deduplicatedTopics: DeduplicateSemanticallySimilarTopicsOutput = {
  canonicalTopics: {
    "login issues": "Login & Crash Issues",
    "app crashing": "Login & Crash Issues",
    "dark mode request": "Feature Request: Dark Mode",
    "UI confusion": "UI/UX Feedback",
    "data export feature": "Feature Request: Data Export",
    "slow performance": "Performance & Speed",
    "login failure": "Login & Crash Issues",
    "request for dark theme": "Feature Request: Dark Mode",
    "app freezes": "Performance & Speed",
    "performance degradation": "Performance & Speed",
  }
};


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
    topic: "Feature Request: Data Export",
    counts: [0, 1, 0, 2, 1, 0, 1],
    total: 5,
  },
  {
    topic: "Positive Feedback",
    counts: [8, 10, 9, 12, 11, 9, 13],
    total: 72,
  },
];
