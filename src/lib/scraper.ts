'use server';

import gplay from 'google-play-scraper';

export async function fetchReviews(appId: string, days: number = 30) {
  try {
    const reviews = await gplay.reviews({
      appId: appId,
      sort: (gplay.sort as any).NEWEST || 2, // Use 2 as common value for NEWEST if property is missing
      num: 1000 
    });

    const today = new Date();
    const startDate = new Date();
    startDate.setDate(today.getDate() - days);

    const filteredReviews = reviews.data.filter(review => {
      const reviewDate = new Date(review.date);
      return reviewDate >= startDate;
    });

    return filteredReviews.map(r => ({
      text: r.text,
      date: r.date,
      score: r.score
    }));
  } catch (error) {
    console.error('Error fetching reviews:', error);
    throw error;
  }
}

export async function getAppIdFromUrl(url: string): Promise<string | null> {
  if (!url) return null;
  if (!url.startsWith('http')) return url; // Assume it's an ID if not a URL
  try {
    const searchParams = new URL(url).searchParams;
    return searchParams.get('id');
  } catch {
    return null;
  }
}
