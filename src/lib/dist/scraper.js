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
exports.getAppIdFromUrl = exports.fetchReviews = void 0;
var google_play_scraper_1 = require("google-play-scraper");
function fetchReviews(appId, days) {
    if (days === void 0) { days = 30; }
    return __awaiter(this, void 0, void 0, function () {
        var reviews, today, startDate_1, filteredReviews, error_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 3]);
                    return [4 /*yield*/, google_play_scraper_1["default"].reviews({
                            appId: appId,
                            sort: google_play_scraper_1["default"].sort.NEWEST || 2,
                            num: 1000
                        })];
                case 1:
                    reviews = _a.sent();
                    today = new Date();
                    startDate_1 = new Date();
                    startDate_1.setDate(today.getDate() - days);
                    filteredReviews = reviews.data.filter(function (review) {
                        var reviewDate = new Date(review.date);
                        return reviewDate >= startDate_1;
                    });
                    return [2 /*return*/, filteredReviews.map(function (r) { return ({
                            text: r.text,
                            date: r.date,
                            score: r.score
                        }); })];
                case 2:
                    error_1 = _a.sent();
                    console.error('Error fetching reviews:', error_1);
                    throw error_1;
                case 3: return [2 /*return*/];
            }
        });
    });
}
exports.fetchReviews = fetchReviews;
function getAppIdFromUrl(url) {
    return __awaiter(this, void 0, Promise, function () {
        var searchParams;
        return __generator(this, function (_a) {
            if (!url)
                return [2 /*return*/, null];
            if (!url.startsWith('http'))
                return [2 /*return*/, url]; // Assume it's an ID if not a URL
            try {
                searchParams = new URL(url).searchParams;
                return [2 /*return*/, searchParams.get('id')];
            }
            catch (_b) {
                return [2 /*return*/, null];
            }
            return [2 /*return*/];
        });
    });
}
exports.getAppIdFromUrl = getAppIdFromUrl;
