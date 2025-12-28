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
var react_1 = require("react");
var react_hook_form_1 = require("react-hook-form");
var zod_1 = require("@hookform/resolvers/zod");
var zod_2 = require("zod");
var lucide_react_1 = require("lucide-react");
var card_1 = require("@/components/ui/card");
var form_1 = require("@/components/ui/form");
var textarea_1 = require("@/components/ui/textarea");
var button_1 = require("@/components/ui/button");
var accordion_1 = require("@/components/ui/accordion");
var skeleton_1 = require("@/components/ui/skeleton");
var use_toast_1 = require("@/hooks/use-toast");
var actions_1 = require("@/lib/actions");
var formSchema = zod_2.z.object({
    reviews: zod_2.z.string().min(10, {
        message: 'Please enter at least a few reviews to analyze.'
    })
});
function TopicExtractionCard() {
    var _a = react_1.useState(false), isLoading = _a[0], setIsLoading = _a[1];
    var _b = react_1.useState(null), result = _b[0], setResult = _b[1];
    var toast = use_toast_1.useToast().toast;
    var form = react_hook_form_1.useForm({
        resolver: zod_1.zodResolver(formSchema),
        defaultValues: {
            reviews: ''
        }
    });
    function onSubmit(values) {
        return __awaiter(this, void 0, void 0, function () {
            var reviews, _a, data, error;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0:
                        setIsLoading(true);
                        setResult(null);
                        reviews = values.reviews.split('\n\n').filter(function (r) { return r.trim() !== ''; });
                        if (reviews.length === 0) {
                            toast({
                                variant: 'destructive',
                                title: 'No Reviews',
                                description: 'Please paste reviews here.'
                            });
                            setIsLoading(false);
                            return [2 /*return*/];
                        }
                        return [4 /*yield*/, actions_1.handleExtractTopics(reviews)];
                    case 1:
                        _a = _b.sent(), data = _a.data, error = _a.error;
                        if (error) {
                            toast({
                                variant: 'destructive',
                                title: 'Error',
                                description: error
                            });
                        }
                        else {
                            setResult(data);
                            toast({
                                title: 'Success',
                                description: 'Topics have been extracted from the reviews.'
                            });
                        }
                        setIsLoading(false);
                        return [2 /*return*/];
                }
            });
        });
    }
    return (React.createElement(card_1.Card, { id: "topic-extraction", className: "flex flex-col" },
        React.createElement(card_1.CardHeader, null,
            React.createElement(card_1.CardTitle, null, "Topic Extraction"),
            React.createElement(card_1.CardDescription, null, "Use AI to extract key topics from user reviews.")),
        React.createElement(form_1.Form, __assign({}, form),
            React.createElement("form", { onSubmit: form.handleSubmit(onSubmit), className: "flex flex-col flex-grow" },
                React.createElement(card_1.CardContent, { className: "flex-grow" },
                    React.createElement(form_1.FormField, { control: form.control, name: "reviews", render: function (_a) {
                            var field = _a.field;
                            return (React.createElement(form_1.FormItem, null,
                                React.createElement(form_1.FormLabel, null, "User Reviews"),
                                React.createElement(form_1.FormControl, null,
                                    React.createElement(textarea_1.Textarea, __assign({ placeholder: "Paste user reviews here, one per line.", className: "min-h-[200px] resize-y bg-background text-foreground" }, field))),
                                React.createElement(form_1.FormMessage, null)));
                        } })),
                React.createElement(card_1.CardFooter, { className: "flex-col items-start gap-4" },
                    React.createElement(button_1.Button, { type: "submit", disabled: isLoading },
                        React.createElement(lucide_react_1.Sparkles, { className: "mr-2" }),
                        isLoading ? 'Analyzing...' : 'Extract Topics'),
                    isLoading && (React.createElement("div", { className: "w-full space-y-2" },
                        React.createElement(skeleton_1.Skeleton, { className: "h-10 w-full" }),
                        React.createElement(skeleton_1.Skeleton, { className: "h-10 w-full" }),
                        React.createElement(skeleton_1.Skeleton, { className: "h-10 w-[80%]" }))),
                    result && result.topics.length > 0 && (React.createElement("div", { className: "w-full" },
                        React.createElement("h3", { className: "mb-2 font-semibold text-card-foreground" }, "Extracted Topics:"),
                        React.createElement(accordion_1.Accordion, { type: "single", collapsible: true, className: "w-full" }, result.topics.map(function (item, index) { return (React.createElement(accordion_1.AccordionItem, { value: "item-" + index, key: index },
                            React.createElement(accordion_1.AccordionTrigger, null, item.topic),
                            React.createElement(accordion_1.AccordionContent, null, item.reasoning))); })))))))));
}
exports["default"] = TopicExtractionCard;
