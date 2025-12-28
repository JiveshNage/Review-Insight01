import { config } from 'dotenv';
config();

import '@/ai/flows/deduplicate-semantically-similar-topics.ts';
import '@/ai/flows/extract-topics-from-reviews.ts';