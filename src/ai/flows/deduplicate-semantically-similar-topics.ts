'use server';

/**
 * @fileOverview Deduplicates semantically similar topics using an LLM.
 *
 * - deduplicateSemanticallySimilarTopics - A function that deduplicates semantically similar topics.
 * - DeduplicateSemanticallySimilarTopicsInput - The input type for the deduplicateSemanticallySimilarTopics function.
 * - DeduplicateSemanticallySimilarTopicsOutput - The return type for the deduplicateSemanticallySimilarTopics function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DeduplicateSemanticallySimilarTopicsInputSchema = z.object({
  topics: z.array(z.string()).describe('An array of topics to deduplicate.'),
  topicMemory: z.record(z.string(), z.string()).optional().describe('A record of known topics and their canonical representations.'),
});
export type DeduplicateSemanticallySimilarTopicsInput = z.infer<typeof DeduplicateSemanticallySimilarTopicsInputSchema>;

const DeduplicateSemanticallySimilarTopicsOutputSchema = z.object({
  canonicalTopics: z.record(z.string(), z.string()).describe('A record of topics and their canonical representations.'),
});
export type DeduplicateSemanticallySimilarTopicsOutput = z.infer<typeof DeduplicateSemanticallySimilarTopicsOutputSchema>;


export async function deduplicateSemanticallySimilarTopics(input: DeduplicateSemanticallySimilarTopicsInput): Promise<DeduplicateSemanticallySimilarTopicsOutput> {
  return deduplicateSemanticallySimilarTopicsFlow(input);
}

const determineCanonicalTopic = ai.defineTool({
  name: 'determineCanonicalTopic',
  description: 'Given a list of topics, determine which is the best canonical representation of all of them.',
  inputSchema: z.object({
    topics: z.array(z.string()).describe('The list of topics to choose from.'),
  }),
  outputSchema: z.string().describe('The canonical topic that best represents all the input topics.'),
},
async (input) => {
  //Basic implementation - can be replaced with a more sophisticated one.
  return input.topics[0];
});

const prompt = ai.definePrompt({
  name: 'deduplicateSemanticallySimilarTopicsPrompt',
  input: {schema: DeduplicateSemanticallySimilarTopicsInputSchema},
  output: {schema: DeduplicateSemanticallySimilarTopicsOutputSchema},
  tools: [determineCanonicalTopic],
  prompt: `You are a topic deduplication expert. You will receive a list of topics and a memory of previously seen topics.

  Your job is to consolidate the given topics, using your knowledge and the topic memory, into a set of canonical topics.

  Here's the list of topics to deduplicate:
  {{#each topics}}- {{{this}}}
  {{/each}}

  Here's the existing topic memory:
  {{#each topicMemory key="topic"}}- Topic: {{{topic}}}, Canonical: {{{this}}}
  {{/each}}

  For each topic in the input list, determine if it is similar to any topic in the topic memory. If it is, use the existing canonical topic.
  If it is not similar to any topic in the topic memory, use the determineCanonicalTopic tool to determine the best canonical topic for the new topic and any other similar topics in the input list.

  Return a record mapping each input topic to its canonical topic.
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
