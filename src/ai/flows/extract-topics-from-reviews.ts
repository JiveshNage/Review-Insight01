'use server';

/**
 * @fileOverview Extracts key topics (issues, requests, feedback) from app reviews using an LLM.
 *
 * - extractTopicsFromReviews - A function that handles the extraction of topics from reviews.
 * - ExtractTopicsFromReviewsInput - The input type for the extractTopicsFromReviews function.
 * - ExtractTopicsFromReviewsOutput - The return type for the extractTopicsFromReviews function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ExtractTopicsFromReviewsInputSchema = z.object({
  reviews: z
    .array(z.string())
    .describe('An array of preprocessed app review texts.'),
});
export type ExtractTopicsFromReviewsInput = z.infer<
  typeof ExtractTopicsFromReviewsInputSchema
>;

const ExtractedTopicSchema = z.object({
  topic: z.string().describe('A key topic extracted from the reviews.'),
  reasoning: z
    .string()
    .describe(
      'Reasoning behind why the topic was determined to be extracted from the reviews.'
    ),
});

const ExtractTopicsFromReviewsOutputSchema = z.object({
  topics: z.array(ExtractedTopicSchema).describe('The extracted topics.'),
});
export type ExtractTopicsFromReviewsOutput = z.infer<
  typeof ExtractTopicsFromReviewsOutputSchema
>;

export async function extractTopicsFromReviews(
  input: ExtractTopicsFromReviewsInput
): Promise<ExtractTopicsFromReviewsOutput> {
  return extractTopicsFromReviewsFlow(input);
}

const extractTopicsPrompt = ai.definePrompt({
  name: 'extractTopicsPrompt',
  input: {schema: ExtractTopicsFromReviewsInputSchema},
  output: {schema: ExtractTopicsFromReviewsOutputSchema},
  prompt: `You are an expert app review analyst.
  Your job is to extract key topics from app reviews.
  These topics represent common issues, requests, and feedback from users.

  Reviews:
  {{#each reviews}}- {{{this}}}\n{{/each}}

  Output the topics you extracted, along with reasoning for why you chose each topic.
  Ensure that the reasoning is clear and concise.
  Be sure to include various issues, requests, and feedback from the users.
  `,
});

const extractTopicsFromReviewsFlow = ai.defineFlow(
  {
    name: 'extractTopicsFromReviewsFlow',
    inputSchema: ExtractTopicsFromReviewsInputSchema,
    outputSchema: ExtractTopicsFromReviewsOutputSchema,
  },
  async input => {
    const {output} = await extractTopicsPrompt(input);
    return output!;
  }
);
