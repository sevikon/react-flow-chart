"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var types_1 = require("../../types");
var PortDefaultOuter = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  width: 20px;\n  height: 20px;\n  background: cornflowerblue;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-radius: 10px;\n"], ["\n  width: 20px;\n  height: 20px;\n  background: cornflowerblue;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-radius: 10px;\n"])));
var PortDefaultInner = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  width: 14px;\n  height: 14px;\n  background: white;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-radius: 10px;\n"], ["\n  width: 14px;\n  height: 14px;\n  background: white;\n  cursor: pointer;\n  display: flex;\n  justify-content: center;\n  align-items: center;\n  border-radius: 10px;\n"])));
exports.PortCustom = function (props) { return (React.createElement(PortDefaultOuter, { style: { backgroundColor: props.port.type === 'left' ? types_1.COLOR_INPUT : types_1.COLOR_OUTPUT } },
    React.createElement(PortDefaultInner, null))); };
var templateObject_1, templateObject_2;
//# sourceMappingURL=PortCustom.js.map