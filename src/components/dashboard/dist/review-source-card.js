'use client';
"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
var zod_1 = require("@hookform/resolvers/zod");
var react_hook_form_1 = require("react-hook-form");
var zod_2 = require("zod");
var card_1 = require("@/components/ui/card");
var form_1 = require("@/components/ui/form");
var input_1 = require("@/components/ui/input");
var button_1 = require("@/components/ui/button");
var calendar_1 = require("@/components/ui/calendar");
var popover_1 = require("@/components/ui/popover");
var lucide_react_1 = require("lucide-react");
var date_fns_1 = require("date-fns");
var utils_1 = require("@/lib/utils");
var use_toast_1 = require("@/hooks/use-toast");
var actions_1 = require("@/lib/actions");
var review_provider_1 = require("@/context/review-provider");
var formSchema = zod_2.z.object({
    appStoreUrl: zod_2.z.string().url({
        message: "Please enter a valid Google Play Store URL."
    }),
    date: zod_2.z.date({
        required_error: "A target date is required."
    })
});
function ReviewSourceCard() {
    var toast = use_toast_1.useToast().toast;
    var _a = review_provider_1.useReview(), setReport = _a.setReport, setIsLoading = _a.setIsLoading, isLoading = _a.isLoading;
    var form = react_hook_form_1.useForm({
        resolver: zod_1.zodResolver(formSchema),
        defaultValues: {
            appStoreUrl: "https://play.google.com/store/apps/details?id=in.swiggy.android",
            date: new Date()
        }
    });
    function onSubmit(values) {
        return __awaiter(this, void 0, void 0, function () {
            var result, error_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        setIsLoading(true);
                        _a.label = 1;
                    case 1:
                        _a.trys.push([1, 3, 4, 5]);
                        return [4 /*yield*/, actions_1.handleProcessReviews(values.appStoreUrl, values.date)];
                    case 2:
                        result = _a.sent();
                        if (result.error) {
                            toast({
                                title: "Error",
                                description: result.error,
                                variant: "destructive"
                            });
                        }
                        else if (result.data) {
                            setReport(result.data);
                            toast({
                                title: "Success",
                                description: result.message
                            });
                        }
                        return [3 /*break*/, 5];
                    case 3:
                        error_1 = _a.sent();
                        toast({
                            title: "Error",
                            description: "An unexpected error occurred. Please try again.",
                            variant: "destructive"
                        });
                        return [3 /*break*/, 5];
                    case 4:
                        setIsLoading(false);
                        return [7 /*endfinally*/];
                    case 5: return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement(card_1.Card, null,
        React.createElement(card_1.CardHeader, null,
            React.createElement(card_1.CardTitle, null, "Review Source"),
            React.createElement(card_1.CardDescription, null, "Specify the app and starting date for trend analysis.")),
        React.createElement(card_1.CardContent, null,
            React.createElement(form_1.Form, __assign({}, form),
                React.createElement("form", { onSubmit: form.handleSubmit(onSubmit), className: "space-y-6" },
                    React.createElement(form_1.FormField, { control: form.control, name: "appStoreUrl", render: function (_a) {
                            var field = _a.field;
                            return (React.createElement(form_1.FormItem, null,
                                React.createElement(form_1.FormLabel, null, "App Store URL / App ID"),
                                React.createElement(form_1.FormControl, null,
                                    React.createElement(input_1.Input, __assign({ placeholder: "https://play.google.com/store/apps/details?id=..." }, field))),
                                React.createElement(form_1.FormMessage, null)));
                        } }),
                    React.createElement(form_1.FormField, { control: form.control, name: "date", render: function (_a) {
                            var field = _a.field;
                            return (React.createElement(form_1.FormItem, { className: "flex flex-col" },
                                React.createElement(form_1.FormLabel, null, "Target Date (T)"),
                                React.createElement(popover_1.Popover, null,
                                    React.createElement(popover_1.PopoverTrigger, { asChild: true },
                                        React.createElement(form_1.FormControl, null,
                                            React.createElement(button_1.Button, { variant: "outline", className: utils_1.cn("w-full pl-3 text-left font-normal", !field.value && "text-muted-foreground") },
                                                field.value ? (date_fns_1.format(field.value, "PPP")) : (React.createElement("span", null, "Pick a date")),
                                                React.createElement(lucide_react_1.CalendarIcon, { className: "ml-auto h-4 w-4 opacity-50" })))),
                                    React.createElement(popover_1.PopoverContent, { className: "w-auto p-0", align: "start" },
                                        React.createElement(calendar_1.Calendar, { mode: "single", selected: field.value, onSelect: field.onChange, disabled: function (date) {
                                                return date > new Date() || date < new Date("1900-01-01");
                                            }, initialFocus: true }))),
                                React.createElement(form_1.FormMessage, null)));
                        } }),
                    React.createElement(button_1.Button, { type: "submit", className: "w-full", disabled: isLoading }, isLoading ? (React.createElement(React.Fragment, null,
                        React.createElement(lucide_react_1.Loader2, { className: "mr-2 h-4 w-4 animate-spin" }),
                        "Processing...")) : (React.createElement(React.Fragment, null,
                        React.createElement(lucide_react_1.Play, { className: "mr-2 h-4 w-4" }),
                        "Generate Trend Report"))))))));
}
exports["default"] = ReviewSourceCard;
