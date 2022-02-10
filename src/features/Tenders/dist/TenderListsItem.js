"use strict";
exports.__esModule = true;
var react_1 = require("react");
var Box_1 = require("@mui/material/Box");
var Button_1 = require("@mui/material/Button");
var Tenders_module_scss_1 = require("./Tenders.module.scss");
var react_moment_1 = require("react-moment");
var react_router_dom_1 = require("react-router-dom");
var react_currency_format_1 = require("react-currency-format");
function TenderListsItem(_a) {
    var item = _a.item, index = _a.index, _b = _a.redirectOnClick, redirectOnClick = _b === void 0 ? true : _b;
    var navigate = react_router_dom_1.useNavigate();
    return (react_1["default"].createElement("div", { onClick: function (e) {
            if (redirectOnClick)
                navigate("/Tender/" + item.Id);
        } },
        react_1["default"].createElement(Box_1["default"], { className: Tenders_module_scss_1["default"].BoxMain, key: index, sx: { p: 2, border: '1px solid grey' } },
            (function () {
                switch (item.Statuses) {
                    case 'Going':
                        return (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(Box_1["default"], { className: Tenders_module_scss_1["default"].BoxHead + " Active" },
                                react_1["default"].createElement(Box_1["default"], null,
                                    react_1["default"].createElement(Button_1["default"], { variant: "contained" }, "00:14:32")),
                                react_1["default"].createElement(Box_1["default"], null,
                                    react_1["default"].createElement(Button_1["default"], { variant: "contained" }, "\u05E4\u05E2\u05D9\u05DC")),
                                react_1["default"].createElement(Box_1["default"], null,
                                    "\u05DE\u05E1\u05F3: ",
                                    item.TenderNumber),
                                react_1["default"].createElement(Box_1["default"], { className: Tenders_module_scss_1["default"].headText }, item.Name))));
                    case 'NotYetStarted':
                        return (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(Box_1["default"], { className: Tenders_module_scss_1["default"].BoxHead + " " + Tenders_module_scss_1["default"].NotYetStarted },
                                react_1["default"].createElement(Box_1["default"], null),
                                react_1["default"].createElement(Box_1["default"], null,
                                    react_1["default"].createElement(Button_1["default"], { style: {
                                            backgroundColor: "#FCC100", width: "116px", color: "#000000"
                                        }, variant: "contained" }, "\u05D8\u05E8\u05DD \u05D4\u05D7\u05DC")),
                                react_1["default"].createElement(Box_1["default"], null,
                                    "\u05DE\u05E1\u05F3: ",
                                    item.TenderNumber),
                                react_1["default"].createElement(Box_1["default"], { className: Tenders_module_scss_1["default"].headText }, item.Name))));
                    case 'Ended':
                        return (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(Box_1["default"], { className: Tenders_module_scss_1["default"].BoxHead + " " + Tenders_module_scss_1["default"].Ended },
                                react_1["default"].createElement(Box_1["default"], null),
                                react_1["default"].createElement(Box_1["default"], null,
                                    react_1["default"].createElement(Button_1["default"], { color: "error", style: {
                                            backgroundColor: "#000000", width: "140px"
                                        }, variant: "contained" }, "\u05D4\u05DE\u05DB\u05E8\u05D6 \u05D4\u05E1\u05EA\u05D9\u05D9\u05DD")),
                                react_1["default"].createElement(Box_1["default"], null,
                                    "\u05DE\u05E1\u05F3: ",
                                    item.TenderNumber),
                                react_1["default"].createElement(Box_1["default"], { className: Tenders_module_scss_1["default"].headText }, item.Name))));
                    case 'Paused':
                        return (react_1["default"].createElement(react_1["default"].Fragment, null,
                            react_1["default"].createElement(Box_1["default"], { className: Tenders_module_scss_1["default"].BoxHead + " " + Tenders_module_scss_1["default"].Paused },
                                react_1["default"].createElement(Box_1["default"], null),
                                react_1["default"].createElement(Box_1["default"], null,
                                    react_1["default"].createElement(Button_1["default"], { variant: "contained", style: {
                                            backgroundColor: "#E3E6F0", width: "140px", color: "#44454B"
                                        } }, "\u05D4\u05DE\u05DB\u05E8\u05D6 \u05D1\u05D4\u05E7\u05E4\u05D0\u05D4")),
                                react_1["default"].createElement(Box_1["default"], null,
                                    "\u05DE\u05E1\u05F3: ",
                                    item.TenderNumber),
                                react_1["default"].createElement(Box_1["default"], { className: Tenders_module_scss_1["default"].headText }, item.Name))));
                    default:
                        return (" ");
                }
            })(),
            react_1["default"].createElement(Box_1["default"], { className: Tenders_module_scss_1["default"].line }),
            (item.Statuses === "NotYetStarted" || item.Statuses === "Paused") ? (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(Box_1["default"], { style: { textAlign: "right" } },
                    react_1["default"].createElement(Box_1["default"], null, "\u05D6\u05DE\u05DF \u05E4\u05EA\u05D9\u05D7\u05D4"),
                    react_1["default"].createElement(Box_1["default"], { className: Tenders_module_scss_1["default"].bold },
                        react_1["default"].createElement(react_moment_1["default"], { format: "hh:mm:ss", interval: 30000 }, item.Time)),
                    react_1["default"].createElement(Box_1["default"], null, "\u05D9\u05D7\u05DC \u05D1\u05E2\u05D5\u05D3 3 \u05E9\u05E2\u05D5\u05EA \u05D5-44 \u05D3\u05E7\u05D5\u05EA")),
                react_1["default"].createElement(Box_1["default"], { className: Tenders_module_scss_1["default"].line }))) : (react_1["default"].createElement(react_1["default"].Fragment, null,
                react_1["default"].createElement(Box_1["default"], { style: { height: "40%", clear: "both" } },
                    react_1["default"].createElement("span", null)))),
            react_1["default"].createElement(Box_1["default"], { className: Tenders_module_scss_1["default"].Proposal },
                react_1["default"].createElement(Box_1["default"], { className: Tenders_module_scss_1["default"].leadPrice },
                    react_1["default"].createElement(Box_1["default"], null, "\u05DE\u05D7\u05D9\u05E8 \u05DE\u05D5\u05D1\u05D9\u05DC"),
                    react_1["default"].createElement(Box_1["default"], { className: Tenders_module_scss_1["default"].bold },
                        react_1["default"].createElement(react_currency_format_1["default"], { decimalScale: 2, value: item.TotalToLead, displayType: 'text', thousandSeparator: true, prefix: item.CurrencyId }))),
                react_1["default"].createElement(Box_1["default"], { className: Tenders_module_scss_1["default"].greenProposal },
                    react_1["default"].createElement(Box_1["default"], null, "\u05D4\u05E6\u05E2\u05EA\u05DA \u05DE\u05D5\u05D1\u05D9\u05DC\u05D4"),
                    react_1["default"].createElement(Box_1["default"], { className: Tenders_module_scss_1["default"].bold },
                        react_1["default"].createElement(react_currency_format_1["default"], { decimalScale: 2, value: item.TotalToLead, displayType: 'text', thousandSeparator: true, prefix: item.CurrencyId })))))));
}
exports["default"] = TenderListsItem;
