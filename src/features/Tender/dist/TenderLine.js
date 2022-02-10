"use strict";
exports.__esModule = true;
var react_1 = require("react");
var material_1 = require("@mui/material");
var Tender_module_scss_1 = require("./Tender.module.scss");
var Accordion_1 = require("@mui/material/Accordion");
var AccordionSummary_1 = require("@mui/material/AccordionSummary");
var AccordionDetails_1 = require("@mui/material/AccordionDetails");
var Typography_1 = require("@mui/material/Typography");
var ExpandMore_1 = require("@mui/icons-material/ExpandMore");
var AddCircle_1 = require("@mui/icons-material/AddCircle");
var RemoveCircle_1 = require("@mui/icons-material/RemoveCircle");
var IconButton_1 = require("@mui/material/IconButton");
var TextField_1 = require("@mui/material/TextField");
var react_currency_format_1 = require("react-currency-format");
function TenderLine(_a) {
    var item = _a.item;
    var _b = react_1["default"].useState(false), expand = _b[0], setExpand = _b[1];
    var fieldVal = react_1.useRef(null);
    var onClickHandler = function (flag, step) {
        var form = fieldVal.current;
        if (form != null && form['tenderSum'] != null) {
            // @ts-ignore: Object is possibly 'null'.
            if (form['tenderSum'].value !== "" && (form['tenderSum'].value !== undefined || form['tenderSum'].value !== 0)) {
                flag ?
                    // @ts-ignore: Object is possibly 'null'.
                    (form['tenderSum'].value = Number(form['tenderSum'].value) + step)
                    :
                        // @ts-ignore: Object is possibly 'null'.
                        (form['tenderSum'].value = Number(form['tenderSum'].value) - step);
            }
        }
    };
    var toggleAcordion = function () {
        setExpand(function (expand) { return !expand; });
    };
    return (react_1["default"].createElement(material_1.Box, { key: item.Index, className: Tender_module_scss_1["default"].TenderLine },
        react_1["default"].createElement(Accordion_1["default"], { sx: { 'box-shadow': 'none' } },
            react_1["default"].createElement(AccordionSummary_1["default"], { onClick: function () { return toggleAcordion(); }, sx: { direction: 'rtl', border: 'none' }, expandIcon: react_1["default"].createElement(ExpandMore_1["default"], null), "aria-controls": "panel1a-content", id: "panel1a-header" },
                react_1["default"].createElement(Typography_1["default"], { component: 'span' },
                    react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].TenderLineHead },
                        react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].title }, item.TenderLineName),
                        react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].headItem },
                            react_1["default"].createElement(material_1.Box, null,
                                " ",
                                react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].titleText }, !item.IsPercentageCalculation ?
                                    react_1["default"].createElement("label", null, "\u05DE\u05E1\u05E4\u05E8 \u05D9\u05D7\u05D9\u05D3\u05D5\u05EA")
                                    : react_1["default"].createElement("label", null, "\u05DE\u05E9\u05E7\u05DC")),
                                "    ",
                                react_1["default"].createElement(material_1.Box, null,
                                    react_1["default"].createElement("b", null, item.RequiredAmount),
                                    item.AmountSign),
                                "   ")),
                        react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].headItem }, !expand &&
                            react_1["default"].createElement(material_1.Box, null,
                                react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].titleText, "aria-label": "\u05DE\u05D7\u05D9\u05E8 \u05DC\u05D9\u05D7\u05D9\u05D3\u05D4" }, "\u05DE\u05D7\u05D9\u05E8 \u05DC\u05D9\u05D7\u05D9\u05D3\u05D4    "),
                                react_1["default"].createElement(material_1.Box, null,
                                    react_1["default"].createElement("b", null,
                                        react_1["default"].createElement(react_currency_format_1["default"], { decimalScale: 2, value: item.Price, displayType: 'text', thousandSeparator: true, prefix: item.CurrencyId }))),
                                " ")),
                        react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].headItem }, !expand &&
                            react_1["default"].createElement(material_1.Box, null,
                                react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].titleText }, "\u05E1\u05D4\"\u05DB"),
                                react_1["default"].createElement(material_1.Box, null,
                                    react_1["default"].createElement("b", null,
                                        react_1["default"].createElement(react_currency_format_1["default"], { decimalScale: 2, value: item.TotalPriceForDisplay, displayType: 'text', thousandSeparator: true, prefix: item.CurrencyId }))),
                                " ")),
                        react_1["default"].createElement(material_1.Box, null, (!expand && true) &&
                            react_1["default"].createElement(material_1.Box, { className: "" + Tender_module_scss_1["default"].Updated }, "\u05E2\u05D5\u05D3\u05DB\u05DF"))))),
            react_1["default"].createElement(AccordionDetails_1["default"], { sx: { 'text-align': 'right' } },
                react_1["default"].createElement(Typography_1["default"], { sx: { 'text-align': 'right' }, component: 'span' },
                    react_1["default"].createElement("form", { ref: fieldVal },
                        react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].line }),
                        react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].tenderSummery },
                            react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].stepDiv },
                                react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].stepTitle, "aria-label": "\u05DE\u05D3\u05E8\u05D2\u05EA \u05D4\u05E6\u05E2\u05D4" }, "\u05DE\u05D3\u05E8\u05D2\u05EA \u05D4\u05E6\u05E2\u05D4"),
                                react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].stepNumber },
                                    react_1["default"].createElement("b", null,
                                        item.PriceStep,
                                        " ",
                                        item.CurrencyId))),
                            react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].unitPrice },
                                react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].stepTitle, "aria-label": "\u05DE\u05D7\u05D9\u05E8 \u05DC\u05D9\u05D7\u05D9\u05D3\u05D4" }, "\u05DE\u05D7\u05D9\u05E8 \u05DC\u05D9\u05D7\u05D9\u05D3\u05D4"),
                                react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].stepField },
                                    react_1["default"].createElement(material_1.Box, null,
                                        react_1["default"].createElement(IconButton_1["default"], { sx: { color: "#00798C" }, onClick: function () { return onClickHandler(true, item.PriceStep); } },
                                            react_1["default"].createElement(AddCircle_1["default"], null))),
                                    react_1["default"].createElement(material_1.Box, null,
                                        react_1["default"].createElement(TextField_1["default"], { className: Tender_module_scss_1["default"].fildSum, type: "number", id: "standard-basic", label: item.CurrencyId, variant: "standard", name: 'tenderSum', value: item.Price })),
                                    react_1["default"].createElement(material_1.Box, null,
                                        react_1["default"].createElement(IconButton_1["default"], { sx: { color: "#00798C" }, onClick: function () { return onClickHandler(false, item.PriceStep); } },
                                            react_1["default"].createElement(RemoveCircle_1["default"], null))))),
                            react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].sum },
                                react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].sumTitle }, "\u05E1\u05D4\"\u05DB"),
                                react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].sumNumber },
                                    react_1["default"].createElement(react_currency_format_1["default"], { decimalScale: 2, value: item.TotalPriceForDisplay, displayType: 'text', thousandSeparator: true, prefix: item.CurrencyId }))))))))));
}
exports["default"] = TenderLine;
