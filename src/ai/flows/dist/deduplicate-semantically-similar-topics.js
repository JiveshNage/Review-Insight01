'use client';
"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
exports.__esModule = true;
exports.deduplicateSemanticallySimilarTopics = void 0;
/**
 * @fileOverview Deduplicates semantically similar topics using an LLM.
 */
var genkit_1 = require("@/ai/genkit");
var genkit_2 = require("genkit");
var DeduplicateSemanticallySimilarTopicsInputSchema = genkit_2.z.object({
    topics: genkit_2.z.array(genkit_2.z.string()).describe('An array of new topics to deduplicate.'),
    topicMemory: genkit_2.z.array(genkit_2.z.string()).optional().describe('An array of already known canonical topics.')
});
var DeduplicateSemanticallySimilarTopicsOutputSchema = genkit_2.z.object({
    mappings: genkit_2.z.record(genkit_2.z.string(), genkit_2.z.string()).describe('A record mapping each input topic to a canonical representation.')
});
function deduplicateSemanticallySimilarTopics(input) {
    return __awaiter(this, void 0, Promise, function () {
        return __generator(this, function (_a) {
            return [2 /*return*/, deduplicateSemanticallySimilarTopicsFlow(input)];
        });
    });
}
exports.deduplicateSemanticallySimilarTopics = deduplicateSemanticallySimilarTopics;
var prompt = genkit_1.ai.definePrompt({
    name: 'deduplicateSemanticallySimilarTopicsPrompt',
    input: { schema: DeduplicateSemanticallySimilarTopicsInputSchema },
    output: { schema: DeduplicateSemanticallySimilarTopicsOutputSchema },
    prompt: "You are a topic deduplication expert. You will receive a list of \"new\" topics and a list of \"existing canonical\" topics.\n\n  Your job is to map each \"new\" topic to either:\n  1. An \"existing canonical\" topic if it is semantically similar (e.g., \"delivery guy was rude\" -> \"Delivery partner rude\").\n  2. A new, clean, concise canonical representation if it doesn't match any existing ones.\n\n  Ensure high recall - similar issues MUST be consolidated.\n\n  New topics:\n  {{#each topics}}- {{{this}}}\n  {{/each}}\n\n  Existing canonical topics:\n  {{#each topicMemory}}- {{{this}}}\n  {{/each}}\n\n  Return a JSON object where keys are the input \"new topics\" and values are their corresponding canonical topics.\n  "
});
var deduplicateSemanticallySimilarTopicsFlow = genkit_1.ai.defineFlow({
    name: 'deduplicateSemanticallySimilarTopicsFlow',
    inputSchema: DeduplicateSemanticallySimilarTopicsInputSchema,
    outputSchema: DeduplicateSemanticallySimilarTopicsOutputSchema
}, function (input) { return __awaiter(void 0, void 0, void 0, function () {
    var output;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, prompt(input)];
            case 1:
                output = (_a.sent()).output;
                return [2 /*return*/, output];
        }
    });
}); });
