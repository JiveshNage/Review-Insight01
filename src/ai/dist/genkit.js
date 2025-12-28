"use strict";
exports.__esModule = true;
exports.ai = void 0;
var genkit_1 = require("genkit");
var google_genai_1 = require("@genkit-ai/google-genai");
exports.ai = genkit_1.genkit({
    plugins: [google_genai_1.googleAI()],
    model: 'googleai/gemini-1.5-flash-latest'
});
