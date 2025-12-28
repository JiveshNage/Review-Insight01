'use client';
"use strict";
exports.__esModule = true;
exports.useReview = exports.ReviewProvider = void 0;
var react_1 = require("react");
var ReviewContext = react_1.createContext(undefined);
function ReviewProvider(_a) {
    var children = _a.children;
    var _b = react_1.useState(null), report = _b[0], setReport = _b[1];
    var _c = react_1.useState(false), isLoading = _c[0], setIsLoading = _c[1];
    return (react_1["default"].createElement(ReviewContext.Provider, { value: { report: report, setReport: setReport, isLoading: isLoading, setIsLoading: setIsLoading } }, children));
}
exports.ReviewProvider = ReviewProvider;
function useReview() {
    var context = react_1.useContext(ReviewContext);
    if (context === undefined) {
        throw new Error('useReview must be used within a ReviewProvider');
    }
    return context;
}
exports.useReview = useReview;
