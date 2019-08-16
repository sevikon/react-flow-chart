"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var src_1 = require("../../src");
var Outer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 20px 30px;\n  font-size: 14px;\n  background: white;\n  cursor: move;\n  border: solid #c5cae9 1px;\n"], ["\n  padding: 20px 30px;\n  font-size: 14px;\n  background: white;\n  cursor: move;\n  border: solid #c5cae9 1px;\n"])));
exports.SidebarItem = function (_a) {
    var type = _a.type, ports = _a.ports, properties = _a.properties;
    return (React.createElement(Outer, { draggable: true, onDragStart: function (event) {
            event.dataTransfer.setData(src_1.REACT_FLOW_CHART, JSON.stringify({ type: type, ports: ports, properties: properties }));
        } }, type));
};
var templateObject_1;
//# sourceMappingURL=SidebarItem.js.map