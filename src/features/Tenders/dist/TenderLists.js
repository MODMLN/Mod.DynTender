"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_redux_1 = require("react-redux");
var TendersSlice_1 = require("./TendersSlice");
var CssBaseline_1 = require("@mui/material/CssBaseline");
var Container_1 = require("@mui/material/Container");
var TenderListsItem_1 = require("./TenderListsItem");
function TenderLists() {
    var dispatch = react_redux_1.useDispatch();
    var getAllTenders = react_redux_1.useSelector(TendersSlice_1.selectTenders);
    react_1.useEffect(function () {
        dispatch(TendersSlice_1.getAllTendersAsync("5"));
        var interval = setInterval(function () {
            dispatch(TendersSlice_1.getAllTendersAsync("5"));
        }, 15000);
        return function () { return clearInterval(interval); };
    }, [dispatch]);
    return (react_1["default"].createElement("div", null,
        react_1["default"].createElement(react_1["default"].Fragment, null,
            react_1["default"].createElement(CssBaseline_1["default"], null),
            react_1["default"].createElement(Container_1["default"], null, getAllTenders.data.map(function (item, index) {
                return (react_1["default"].createElement(TenderListsItem_1["default"], { key: index, item: item, index: index, redirectOnClick: true }));
            })))));
}
exports["default"] = TenderLists;
