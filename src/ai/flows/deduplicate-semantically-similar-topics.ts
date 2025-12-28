'use server';

/**
 * @fileOverview Deduplicates semantically similar topics using an LLM.
<<<<<<< HEAD
=======
 *
 * - deduplicateSemanticallySimilarTopics - A function that deduplicates semantically similar topics.
 * - DeduplicateSemanticallySimilarTopicsInput - The input type for the deduplicateSemanticallySimilarTopics function.
 * - DeduplicateSemanticallySimilarTopicsOutput - The return type for the deduplicateSemanticallySimilarTopics function.
>>>>>>> origin/main
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const DeduplicateSemanticallySimilarTopicsInputSchema = z.object({
<<<<<<< HEAD
  topics: z.array(z.string()).describe('An array of new topics to deduplicate.'),
  topicMemory: z.array(z.string()).optional().describe('An array of already known canonical topics.'),
=======
  topics: z.array(z.string()).describe('An array of topics to deduplicate.'),
  topicMemory: z.record(z.string(), z.string()).optional().describe('A record of known topics and their canonical representations.'),
>>>>>>> origin/main
});
export type DeduplicateSemanticallySimilarTopicsInput = z.infer<typeof DeduplicateSemanticallySimilarTopicsInputSchema>;

const DeduplicateSemanticallySimilarTopicsOutputSchema = z.object({
<<<<<<< HEAD
  mappings: z.record(z.string(), z.string()).describe('A record mapping each input topic to a canonical representation.'),
=======
  canonicalTopics: z.record(z.string(), z.string()).describe('A record of topics and their canonical representations.'),
>>>>>>> origin/main
});
export type DeduplicateSemanticallySimilarTopicsOutput = z.infer<typeof DeduplicateSemanticallySimilarTopicsOutputSchema>;


export async function deduplicateSemanticallySimilarTopics(input: DeduplicateSemanticallySimilarTopicsInput): Promise<DeduplicateSemanticallySimilarTopicsOutput> {
  return deduplicateSemanticallySimilarTopicsFlow(input);
}

<<<<<<< HEAD
=======
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

>>>>>>> origin/main
const prompt = ai.definePrompt({
  name: 'deduplicateSemanticallySimilarTopicsPrompt',
  input: {schema: DeduplicateSemanticallySimilarTopicsInputSchema},
  output: {schema: DeduplicateSemanticallySimilarTopicsOutputSchema},
<<<<<<< HEAD
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
=======
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
>>>>>>> origin/main
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
