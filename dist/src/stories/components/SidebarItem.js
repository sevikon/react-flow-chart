"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var src_1 = require("../../src");
var Outer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 20px 30px;\n  font-size: 14px;\n  background: white;\n  cursor: move;\n  border: solid #c5cae9 1px;\n"], ["\n  padding: 20px 30px;\n  font-size: 14px;\n  background: white;\n  cursor: move;\n  border: solid #c5cae9 1px;\n"])));
var SidebarItem = /** @class */ (function (_super) {
    __extends(SidebarItem, _super);
    function SidebarItem() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.state = {
            width: 0,
            height: 0,
            offsetX: 0,
            offsetY: 0,
        };
        _this.ref = React.createRef();
        _this.updateSize = function () {
            var el = _this.ref.current;
            if (el) {
                var rect = el.getBoundingClientRect();
                if (el.offsetWidth !== _this.state.width || el.offsetHeight !== _this.state.height) {
                    _this.setState({ width: el.offsetWidth, height: el.offsetHeight });
                }
                if (rect.left !== _this.state.offsetX || rect.top !== _this.state.offsetY) {
                    _this.setState({ offsetX: rect.left, offsetY: rect.top });
                }
            }
        };
        return _this;
    }
    SidebarItem.prototype.componentDidMount = function () {
        this.updateSize();
        if (this.ref.current) {
            if (window.ResizeObserver) {
                var ro = new window.ResizeObserver(this.updateSize);
                ro.observe(this.ref.current);
            }
            else {
                window.addEventListener('resize', this.updateSize);
            }
        }
    };
    SidebarItem.prototype.componentDidUpdate = function () {
        this.updateSize();
    };
    SidebarItem.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.updateSize);
    };
    SidebarItem.prototype.render = function () {
        var _this = this;
        var _a = this.props, type = _a.type, ports = _a.ports, properties = _a.properties;
        return (React.createElement("div", { ref: this.ref, className: "sidebar-item" },
            React.createElement(Outer, { draggable: true, onDragStart: function (event) {
                    var el = _this.ref.current;
                    if (el) {
                        var rect = el.getBoundingClientRect();
                        var offsetX = el.clientLeft + event.clientX - rect.left;
                        var offsetY = el.clientTop + event.clientY - rect.top;
                        event.dataTransfer.setData(src_1.REACT_FLOW_CHART, JSON.stringify({ type: type, ports: ports, properties: properties, offsetX: offsetX, offsetY: offsetY }));
                    }
                } }, type)));
    };
    return SidebarItem;
}(React.Component));
exports.SidebarItem = SidebarItem;
var templateObject_1;
//# sourceMappingURL=SidebarItem.js.map