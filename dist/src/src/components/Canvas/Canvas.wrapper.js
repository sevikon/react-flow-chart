"use strict";
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
var react_draggable_1 = require("react-draggable");
var __1 = require("../../");
var CanvasContext_1 = require("./CanvasContext");
var CanvasWrapper = /** @class */ (function (_super) {
    __extends(CanvasWrapper, _super);
    function CanvasWrapper() {
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
                    _this.props.onSizeChange(el.offsetWidth, el.offsetHeight);
                }
                if (rect.left !== _this.state.offsetX || rect.top !== _this.state.offsetY) {
                    _this.setState({ offsetX: rect.left, offsetY: rect.top });
                }
            }
        };
        return _this;
    }
    CanvasWrapper.prototype.componentDidMount = function () {
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
    CanvasWrapper.prototype.componentDidUpdate = function () {
        this.updateSize();
    };
    CanvasWrapper.prototype.componentWillUnmount = function () {
        window.removeEventListener('resize', this.updateSize);
    };
    CanvasWrapper.prototype.render = function () {
        var _this = this;
        var _a = this.props, ComponentInner = _a.ComponentInner, ComponentOuter = _a.ComponentOuter, position = _a.position, onDragCanvas = _a.onDragCanvas, children = _a.children, onCanvasClick = _a.onCanvasClick, onDeleteKey = _a.onDeleteKey, onCanvasDrop = _a.onCanvasDrop;
        return (React.createElement(CanvasContext_1.default.Provider, { value: { offsetX: this.state.offsetX, offsetY: this.state.offsetY } },
            React.createElement(ComponentOuter, { ref: this.ref },
                React.createElement(react_draggable_1.default, { axis: "both", position: position, grid: [1, 1], onDrag: function (e, dragData) { return onDragCanvas(e, dragData); } },
                    React.createElement(ComponentInner, { children: children, onClick: onCanvasClick, tabIndex: 0, onKeyDown: function (e) {
                            if (e.keyCode === 46) {
                                onDeleteKey();
                            }
                        }, onDrop: function (e) {
                            var data = JSON.parse(e.dataTransfer.getData(__1.REACT_FLOW_CHART));
                            onCanvasDrop({
                                data: data, position: {
                                    x: e.clientX - position.x - _this.state.offsetX - (data.offsetX || 0),
                                    y: e.clientY - position.y - _this.state.offsetY - (data.offsetY || 0),
                                },
                            });
                        }, onDragOver: function (e) { return e.preventDefault(); } })))));
    };
    return CanvasWrapper;
}(React.Component));
exports.CanvasWrapper = CanvasWrapper;
//# sourceMappingURL=Canvas.wrapper.js.map