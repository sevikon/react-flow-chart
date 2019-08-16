"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var __1 = require("../../");
var types_1 = require("../Advanced/types");
exports.LinkDefault = function (_a) {
    var link = _a.link, startPos = _a.startPos, endPos = _a.endPos, onLinkMouseEnter = _a.onLinkMouseEnter, onLinkMouseLeave = _a.onLinkMouseLeave, onLinkClick = _a.onLinkClick, isHovered = _a.isHovered, isSelected = _a.isSelected, _b = _a.color, color = _b === void 0 ? types_1.COLOR_OUTPUT : _b;
    var points = __1.generateCurvePath(startPos, endPos);
    return (React.createElement("svg", { style: { overflow: 'visible', position: 'absolute', cursor: 'pointer', left: 0, right: 0 } },
        React.createElement("circle", { r: "4", cx: startPos.x, cy: startPos.y, fill: color }),
        React.createElement("path", { d: points, stroke: color, strokeWidth: "3", fill: "none" }),
        React.createElement("path", { d: points, stroke: color, strokeWidth: "20", fill: "none", strokeLinecap: "round", strokeOpacity: (isHovered || isSelected) ? 0.1 : 0, onMouseEnter: function () { return onLinkMouseEnter({ linkId: link.id }); }, onMouseLeave: function () { return onLinkMouseLeave({ linkId: link.id }); }, onClick: function (e) {
                onLinkClick({ linkId: link.id });
                e.stopPropagation();
            } }),
        React.createElement("circle", { r: "4", cx: endPos.x, cy: endPos.y, fill: color })));
};
//# sourceMappingURL=Link.default.js.map