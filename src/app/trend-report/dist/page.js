"use strict";
exports.__esModule = true;
var app_header_1 = require("@/components/layout/app-header");
var app_sidebar_1 = require("@/components/layout/app-sidebar");
var sidebar_1 = require("@/components/ui/sidebar");
var trend_report_card_1 = require("@/components/dashboard/trend-report-card");
var review_source_card_1 = require("@/components/dashboard/review-source-card");
var review_provider_1 = require("@/context/review-provider");
function TrendReportPage() {
    return (React.createElement(review_provider_1.ReviewProvider, null,
        React.createElement(sidebar_1.SidebarProvider, null,
            React.createElement(app_sidebar_1["default"], null),
            React.createElement(sidebar_1.SidebarInset, { className: "bg-background" },
                React.createElement(app_header_1["default"], null),
                React.createElement("main", { className: "p-4 lg:p-6 space-y-6" },
                    React.createElement(review_source_card_1["default"], null),
                    React.createElement(trend_report_card_1["default"], null))))));
}
exports["default"] = TrendReportPage;
