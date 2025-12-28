import {genkit} from 'genkit';
import {googleAI} from '@genkit-ai/google-genai';

export const ai = genkit({
  plugins: [googleAI()],
<<<<<<< HEAD
  model: 'googleai/gemini-1.5-flash-latest',
=======
  model: 'googleai/gemini-2.5-flash',
>>>>>>> origin/main
});
