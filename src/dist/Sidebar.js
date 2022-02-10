"use strict";
exports.__esModule = true;
var material_1 = require("@mui/material");
var react_1 = require("react");
var react_burger_menu_1 = require("react-burger-menu");
var material_2 = require("@mui/material");
function SidebarRight() {
    return (react_1["default"].createElement(react_burger_menu_1.slide, { right: true, pageWrapId: "slide", width: '370px', isOpen: false, menuClassName: "burgerMenu" },
        react_1["default"].createElement(material_2.Box, { sx: { display: 'inline-flex' } },
            react_1["default"].createElement(material_2.Box, null,
                react_1["default"].createElement(material_1.Button, { variant: "contained", style: { backgroundColor: '#00798C' } }, "\u05E9\u05D9\u05E0\u05D5\u05D9 \u05E1\u05D9\u05E1\u05DE\u05D0")),
            react_1["default"].createElement(material_2.Box, null,
                react_1["default"].createElement(material_1.Button, { variant: "outlined", style: { borderColor: '#00798C', color: '#00798C' } }, "\u05D4\u05EA\u05E0\u05EA\u05E7\u05D5\u05EA")))));
}
exports["default"] = SidebarRight;
