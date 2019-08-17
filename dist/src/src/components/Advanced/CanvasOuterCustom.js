"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var styled_components_1 = require("styled-components");
exports.CanvasOuterCustomImageFunc = function (image) {
    return styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  position: relative;\n  background-color: #4f6791;\n  background-image: url(", ");\n  background-size: cover;\n  background-position: center;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  cursor: not-allowed;\n"], ["\n  position: relative;\n  background-color: #4f6791;\n  background-image: url(", ");\n  background-size: cover;\n  background-position: center;\n  width: 100%;\n  height: 100%;\n  overflow: hidden;\n  cursor: not-allowed;\n"])), image);
};
var templateObject_1;
//# sourceMappingURL=CanvasOuterCustom.js.map