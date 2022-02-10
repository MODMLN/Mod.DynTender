"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var react_1 = require("react");
var Tender_module_scss_1 = require("./Tender.module.scss");
var InfoOutlined_1 = require("@mui/icons-material/InfoOutlined");
var Tooltip_1 = require("@mui/material/Tooltip");
var TextField_1 = require("@mui/material/TextField");
function Preferences() {
    return (react_1["default"].createElement(react_1["default"].Fragment, null,
        react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].privilege },
            react_1["default"].createElement(material_1.Box, null,
                react_1["default"].createElement("label", { "aria-label": "\u05DC\u05DE\u05D9\u05DE\u05D5\u05E9 \u05D4\u05D4\u05E2\u05D3\u05E4\u05D5\u05EA, \u05D9\u05E9 \u05DC\u05D4\u05D6\u05D9\u05DF \u05D0\u05EA \u05DE\u05E8\u05DB\u05D9\u05D1\u05D9 \u05D4\u05DE\u05D7\u05D9\u05E8 \u05DC\u05D9\u05D7\u05D9\u05D3\u05D4", className: Tender_module_scss_1["default"].titleLbl }, "\u05DC\u05DE\u05D9\u05DE\u05D5\u05E9 \u05D4\u05D4\u05E2\u05D3\u05E4\u05D5\u05EA, \u05D9\u05E9 \u05DC\u05D4\u05D6\u05D9\u05DF \u05D0\u05EA \u05DE\u05E8\u05DB\u05D9\u05D1\u05D9 \u05D4\u05DE\u05D7\u05D9\u05E8 \u05DC\u05D9\u05D7\u05D9\u05D3\u05D4:")),
            react_1["default"].createElement(material_1.Box, { sx: { marginTop: '50px' } },
                react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].inlineFlex },
                    react_1["default"].createElement(material_1.Box, null,
                        react_1["default"].createElement("label", { className: Tender_module_scss_1["default"].titleLbl }, "\u05E2\u05DC\u05D5\u05EA \u05DE\u05E8\u05DB\u05D9\u05D1 \u05EA\u05D5\u05E6\u05E8\u05EA \u05D4\u05D0\u05E8\u05E5"),
                        react_1["default"].createElement(Tooltip_1["default"], { placement: "top-start", title: "\u05D0\u05D9\u05E0\u05E4\u05D5\u05E8\u05DE\u05E6\u05D9\u05D4 \u05DE\u05D8\u05D5\u05E8\u05E4\u05EA" },
                            react_1["default"].createElement(InfoOutlined_1["default"], { sx: { height: '14px' } }))),
                    react_1["default"].createElement(material_1.Box, null),
                    react_1["default"].createElement(material_1.Box, null,
                        react_1["default"].createElement(TextField_1["default"], { sx: { width: '110px', border: '1px solid #44454B', backgroundColor: '#F4F8FF' }, disabled: true, type: "number", id: "outlined-disabled", label: null, defaultValue: "", variant: "filled" })))),
            react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].privilege },
                react_1["default"].createElement(material_1.Box, { sx: { marginTop: '50px' } },
                    react_1["default"].createElement(material_1.Box, { className: Tender_module_scss_1["default"].inlineFlex },
                        react_1["default"].createElement(material_1.Box, null,
                            react_1["default"].createElement("label", { className: Tender_module_scss_1["default"].titleLbl }, "\u05DE\u05E8\u05DB\u05D9\u05D1 \u05DB\u05D7 \u05E2\u05D1\u05D5\u05D3\u05D4"),
                            react_1["default"].createElement(Tooltip_1["default"], { placement: "top-start", title: "\u05D0\u05D9\u05E0\u05E4\u05D5\u05E8\u05DE\u05E6\u05D9\u05D4 \u05DE\u05D8\u05D5\u05E8\u05E4\u05EA" },
                                react_1["default"].createElement(InfoOutlined_1["default"], { sx: { height: '14px' } }))),
                        react_1["default"].createElement(material_1.Box, null),
                        react_1["default"].createElement(material_1.Box, null,
                            react_1["default"].createElement(TextField_1["default"], { sx: { width: '110px', border: '1px solid #44454B', backgroundColor: '#F4F8FF' }, disabled: true, type: "number", id: "outlined-disabled", label: null, defaultValue: "", variant: "filled" }))))))));
}
exports["default"] = Preferences;
