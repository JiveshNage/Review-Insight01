'use server';

import {
  extractTopicsFromReviews,
  type ExtractTopicsFromReviewsOutput,
} from '@/ai/flows/extract-topics-from-reviews';
import {
  deduplicateSemanticallySimilarTopics,
  type DeduplicateSemanticallySimilarTopicsOutput,
} from '@/ai/flows/deduplicate-semantically-similar-topics';

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
