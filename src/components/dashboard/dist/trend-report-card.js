'use client';
"use strict";
exports.__esModule = true;
var card_1 = require("@/components/ui/card");
var table_1 = require("@/components/ui/table");
var button_1 = require("@/components/ui/button");
var lucide_react_1 = require("lucide-react");
var badge_1 = require("@/components/ui/badge");
var scroll_area_1 = require("@/components/ui/scroll-area");
var review_provider_1 = require("@/context/review-provider");
function TrendReportCard() {
    var _a = review_provider_1.useReview(), report = _a.report, isLoading = _a.isLoading;
    if (isLoading) {
        return (React.createElement(card_1.Card, null,
            React.createElement(card_1.CardContent, { className: "flex flex-col items-center justify-center p-12" },
                React.createElement(lucide_react_1.Loader2, { className: "h-8 w-8 animate-spin text-primary" }),
                React.createElement("p", { className: "mt-4 text-muted-foreground" }, "Generating Trend Report... This may take a few minutes as we process daily batches."))));
    }
    if (!report) {
        return (React.createElement(card_1.Card, null,
            React.createElement(card_1.CardHeader, null,
                React.createElement(card_1.CardTitle, null, "Trend Report"),
                React.createElement(card_1.CardDescription, null, "No report generated yet. Please enter an app URL and process reviews."))));
    }
    return (React.createElement(card_1.Card, { id: "trend-report" },
        React.createElement(card_1.CardHeader, null,
            React.createElement(card_1.CardTitle, null, "Topic Trend Report (T to T-30)"),
            React.createElement(card_1.CardDescription, null, "Daily occurrence frequency of topics extracted from user reviews.")),
        React.createElement(card_1.CardContent, { className: "font-data" },
            React.createElement(scroll_area_1.ScrollArea, { className: "w-full whitespace-nowrap rounded-md border" },
                React.createElement(table_1.Table, null,
                    React.createElement(table_1.TableHeader, null,
                        React.createElement(table_1.TableRow, null,
                            React.createElement(table_1.TableHead, { className: "min-w-[200px] font-semibold sticky left-0 bg-background z-10" }, "Topic"),
                            report.headers.map(function (header, i) { return (React.createElement(table_1.TableHead, { key: i, className: "text-center font-semibold" }, header)); }),
                            React.createElement(table_1.TableHead, { className: "text-right font-semibold" }, "Total"))),
                    React.createElement(table_1.TableBody, null, report.data.map(function (row) { return (React.createElement(table_1.TableRow, { key: row.topic },
                        React.createElement(table_1.TableCell, { className: "font-medium sticky left-0 bg-background z-10 border-r" }, row.topic),
                        row.counts.map(function (count, index) { return (React.createElement(table_1.TableCell, { key: index, className: "text-center" }, count > 0 ? (React.createElement(badge_1.Badge, { variant: "secondary", className: "w-8 justify-center bg-secondary text-secondary-foreground" }, count)) : (React.createElement("span", { className: "text-muted-foreground" }, "-")))); }),
                        React.createElement(table_1.TableCell, { className: "text-right font-bold" }, row.total))); }))))),
        React.createElement(card_1.CardFooter, null,
            React.createElement(button_1.Button, { variant: "outline", onClick: function () {
                    var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(report));
                    var downloadAnchorNode = document.createElement('a');
                    downloadAnchorNode.setAttribute("href", dataStr);
                    downloadAnchorNode.setAttribute("download", "trend-report.json");
                    document.body.appendChild(downloadAnchorNode);
                    downloadAnchorNode.click();
                    downloadAnchorNode.remove();
                } },
                React.createElement(lucide_react_1.Download, { className: "mr-2" }),
                "Export JSON"))));
}
exports["default"] = TrendReportCard;
