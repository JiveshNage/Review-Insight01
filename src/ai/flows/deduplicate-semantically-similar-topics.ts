'use client';

/**
 * @fileOverview Deduplicates semantically similar topics using an LLM.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DeduplicateSemanticallySimilarTopicsInputSchema = z.object({
  topics: z.array(z.string()).describe('An array of new topics to deduplicate.'),
  topicMemory: z.array(z.string()).optional().describe('An array of already known canonical topics.'),
});
export type DeduplicateSemanticallySimilarTopicsInput = z.infer<typeof DeduplicateSemanticallySimilarTopicsInputSchema>;

const DeduplicateSemanticallySimilarTopicsOutputSchema = z.object({
  mappings: z.record(z.string(), z.string()).describe('A record mapping each input topic to a canonical representation.'),
});
export type DeduplicateSemanticallySimilarTopicsOutput = z.infer<typeof DeduplicateSemanticallySimilarTopicsOutputSchema>;


export async function deduplicateSemanticallySimilarTopics(input: DeduplicateSemanticallySimilarTopicsInput): Promise<DeduplicateSemanticallySimilarTopicsOutput> {
  return deduplicateSemanticallySimilarTopicsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'deduplicateSemanticallySimilarTopicsPrompt',
  input: {schema: DeduplicateSemanticallySimilarTopicsInputSchema},
  output: {schema: DeduplicateSemanticallySimilarTopicsOutputSchema},
  prompt: `You are a topic deduplication expert. You will receive a list of "new" topics and a list of "existing canonical" topics.

  Your job is to map each "new" topic to either:
  1. An "existing canonical" topic if it is semantically similar (e.g., "delivery guy was rude" -> "Delivery partner rude").
  2. A new, clean, concise canonical representation if it doesn't match any existing ones.

  Ensure high recall - similar issues MUST be consolidated.

  New topics:
  {{#each topics}}- {{{this}}}
  {{/each}}

  Existing canonical topics:
  {{#each topicMemory}}- {{{this}}}
  {{/each}}

  Return a JSON object where keys are the input "new topics" and values are their corresponding canonical topics.
  `,
});

const deduplicateSemanticallySimilarTopicsFlow = ai.defineFlow(
  {
    name: 'deduplicateSemanticallySimilarTopicsFlow',
    inputSchema: DeduplicateSemanticallySimilarTopicsInputSchema,
    outputSchema: DeduplicateSemanticallySimilarTopicsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
