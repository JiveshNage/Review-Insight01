'use server';
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
exports.handleDeduplicateTopics = exports.handleExtractTopics = exports.handleProcessReviews = void 0;
var scraper_1 = require("./scraper");
var extract_topics_from_reviews_1 = require("@/ai/flows/extract-topics-from-reviews");
var deduplicate_semantically_similar_topics_1 = require("@/ai/flows/deduplicate-semantically-similar-topics");
var date_fns_1 = require("date-fns");
var fs_1 = require("fs");
var path_1 = require("path");
function handleProcessReviews(appStoreUrl, targetDate) {
    return __awaiter(this, void 0, Promise, function () {
        var appId, reviews, dailyData_1, dates_2, i, d, dateStr, allExtractedTopicsByDate_1, uniqueTopicsFound_1, _i, dates_1, dateStr, extractionResult, deduplicationResult, topicMappings_1, canonicalTopics, trendData, report, outputDir, fileName, e_1, errorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 8, , 9]);
                    return [4 /*yield*/, scraper_1.getAppIdFromUrl(appStoreUrl)];
                case 1:
                    appId = _a.sent();
                    if (!appId)
                        throw new Error("Invalid App Store URL or ID");
                    return [4 /*yield*/, scraper_1.fetchReviews(appId, 31)];
                case 2:
                    reviews = _a.sent();
                    dailyData_1 = {};
                    dates_2 = [];
                    for (i = 0; i < 31; i++) {
                        d = date_fns_1.subDays(targetDate, i);
                        dateStr = date_fns_1.format(d, 'yyyy-MM-dd');
                        dates_2.unshift(dateStr); // Keep chronological order T-30 to T
                        dailyData_1[dateStr] = [];
                    }
                    reviews.forEach(function (r) {
                        var dateStr = date_fns_1.format(new Date(r.date), 'yyyy-MM-dd');
                        if (dailyData_1[dateStr]) {
                            dailyData_1[dateStr].push(r.text);
                        }
                    });
                    allExtractedTopicsByDate_1 = {};
                    uniqueTopicsFound_1 = new Set();
                    _i = 0, dates_1 = dates_2;
                    _a.label = 3;
                case 3:
                    if (!(_i < dates_1.length)) return [3 /*break*/, 6];
                    dateStr = dates_1[_i];
                    if (dailyData_1[dateStr].length === 0)
                        return [3 /*break*/, 5];
                    return [4 /*yield*/, extract_topics_from_reviews_1.extractTopicsFromReviews({ reviews: dailyData_1[dateStr] })];
                case 4:
                    extractionResult = _a.sent();
                    allExtractedTopicsByDate_1[dateStr] = extractionResult.topics.map(function (t) { return t.topic; });
                    extractionResult.topics.forEach(function (t) { return uniqueTopicsFound_1.add(t.topic); });
                    _a.label = 5;
                case 5:
                    _i++;
                    return [3 /*break*/, 3];
                case 6: return [4 /*yield*/, deduplicate_semantically_similar_topics_1.deduplicateSemanticallySimilarTopics({
                        topics: Array.from(uniqueTopicsFound_1),
                        topicMemory: [] // We could pass seed topics here
                    })];
                case 7:
                    deduplicationResult = _a.sent();
                    topicMappings_1 = deduplicationResult.mappings;
                    canonicalTopics = Array.from(new Set(Object.values(topicMappings_1)));
                    trendData = canonicalTopics.map(function (topic) {
                        var counts = dates_2.map(function (dateStr) {
                            var dailyTopics = allExtractedTopicsByDate_1[dateStr] || [];
                            // Count how many original topics from this day map to this canonical topic
                            // Actually, usually we'd want to count review occurrences.
                            // But if we want frequency of topic occurrence:
                            return dailyTopics.filter(function (t) { return topicMappings_1[t] === topic; }).length;
                        });
                        return {
                            topic: topic,
                            counts: counts,
                            total: counts.reduce(function (a, b) { return a + b; }, 0)
                        };
                    });
                    report = {
                        headers: dates_2.map(function (d) { return date_fns_1.format(new Date(d), 'MMM d'); }),
                        data: trendData
                    };
                    outputDir = path_1["default"].join(process.cwd(), 'output');
                    if (!fs_1["default"].existsSync(outputDir))
                        fs_1["default"].mkdirSync(outputDir);
                    fileName = "trend-report-" + appId + "-" + date_fns_1.format(targetDate, 'yyyy-MM-dd') + ".json";
                    fs_1["default"].writeFileSync(path_1["default"].join(outputDir, fileName), JSON.stringify(report, null, 2));
                    return [2 /*return*/, {
                            message: "Trend analysis report generated successfully.",
                            error: null,
                            data: report
                        }];
                case 8:
                    e_1 = _a.sent();
                    console.error(e_1);
                    errorMessage = e_1 instanceof Error ? e_1.message : 'An unknown error occurred.';
                    return [2 /*return*/, { message: null, error: "Failed to process reviews: " + errorMessage }];
                case 9: return [2 /*return*/];
            }
        });
    });
}
exports.handleProcessReviews = handleProcessReviews;
function handleExtractTopics(reviews) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, extract_topics_from_reviews_1.extractTopicsFromReviews({ reviews: reviews })];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, { data: data, error: null }];
            }
        });
    });
}
exports.handleExtractTopics = handleExtractTopics;
function handleDeduplicateTopics(topics) {
    return __awaiter(this, void 0, void 0, function () {
        var data;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, deduplicate_semantically_similar_topics_1.deduplicateSemanticallySimilarTopics({ topics: topics, topicMemory: [] })];
                case 1:
                    data = _a.sent();
                    return [2 /*return*/, { data: data, error: null }];
            }
        });
    });
}
exports.handleDeduplicateTopics = handleDeduplicateTopics;
