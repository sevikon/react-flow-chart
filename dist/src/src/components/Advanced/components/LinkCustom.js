"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
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
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var Link_1 = require("../../Link");
var types_1 = require("../types");
var Label = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: absolute;\n"], ["\n  position: absolute;\n"])));
var Button = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 0;\n  height: 20px;\n  width: 20px;\n  transform: translate(50%, -50%);\n  background: ", ";\n  color: white;\n  border-radius: 50%;\n  transition: 0.3s ease all;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n  cursor: pointer;\n  font-weight: bold;\n  &:hover {\n    box-shadow: 0 10px 20px rgba(0,0,0,.1);\n  }\n"], ["\n  position: absolute;\n  top: 0;\n  right: 0;\n  padding: 0;\n  height: 20px;\n  width: 20px;\n  transform: translate(50%, -50%);\n  background: ", ";\n  color: white;\n  border-radius: 50%;\n  transition: 0.3s ease all;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 16px;\n  cursor: pointer;\n  font-weight: bold;\n  &:hover {\n    box-shadow: 0 10px 20px rgba(0,0,0,.1);\n  }\n"])), types_1.COLOR_LINK_CLOSE);
var LabelContent = styled_components_1.default.div(templateObject_3 || (templateObject_3 = __makeTemplateObject(["\n  padding: 5px 10px;\n  background: ", ";\n  color: white;\n  border-radius: 5px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 10px;\n  cursor: pointer;\n"], ["\n  padding: 5px 10px;\n  background: ", ";\n  color: white;\n  border-radius: 5px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  font-size: 10px;\n  cursor: pointer;\n"])), types_1.COLOR_INPUT);
exports.LinkCustom = function (props, callbacks) {
    var startPos = props.startPos, endPos = props.endPos, link = props.link;
    var centerX = startPos.x + (endPos.x - startPos.x) / 2;
    var centerY = startPos.y + (endPos.y - startPos.y) / 2;
    return (React.createElement(React.Fragment, null,
        React.createElement(Link_1.LinkDefault, __assign({}, props)),
        React.createElement(Label, { style: { left: centerX, top: centerY } },
            props.link.properties && props.link.properties.label && (React.createElement(LabelContent, null, props.link.properties && props.link.properties.label)),
            React.createElement(Button, { onClick: function (e) {
                    callbacks.onDelete(link);
                    e.stopPropagation();
                } }, "x"))));
};
exports.LinkCustomWrapper = function (props, callbacks) {
    return exports.LinkCustom(props, callbacks);
};
var templateObject_1, templateObject_2, templateObject_3;
//# sourceMappingURL=LinkCustom.js.map