'use server';

import {
  extractTopicsFromReviews,
  type ExtractTopicsFromReviewsOutput,
} from '@/ai/flows/extract-topics-from-reviews';
import {
  deduplicateSemanticallySimilarTopics,
  type DeduplicateSemanticallySimilarTopicsOutput,
} from '@/ai/flows/deduplicate-semantically-similar-topics';

export async function handleProcessReviews(appStoreUrl: string, date: Date): Promise<{ message: string | null; error: string | null }> {
  try {
    // This is where the review fetching and processing logic will go.
    // For now, we'll just log the input and return a success message.
    console.log(`Processing reviews for ${appStoreUrl} on ${date.toDateString()}`);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate async work
    return { message: "Review processing started. The report will be updated shortly.", error: null };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { message: null, error: `Failed to process reviews: ${errorMessage}` };
  }
}

export async function handleExtractTopics(
  reviews: string[]
): Promise<{ data: ExtractTopicsFromReviewsOutput | null; error: string | null }> {
  try {
    const result = await extractTopicsFromReviews({ reviews });
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { data: null, error: `Failed to extract topics: ${errorMessage}` };
  }
}

export async function handleDeduplicateTopics(
  topics: string[]
): Promise<{ data: DeduplicateSemanticallySimilarTopicsOutput | null; error: string | null }> {
  try {
    const result = await deduplicateSemanticallySimilarTopics({ topics });
    return { data: result, error: null };
  } catch (e) {
    console.error(e);
    const errorMessage = e instanceof Error ? e.message : 'An unknown error occurred.';
    return { data: null, error: `Failed to deduplicate topics: ${errorMessage}` };
  }
}
