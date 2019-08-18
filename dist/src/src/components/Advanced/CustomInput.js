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
var Input = styled_components_1.default.input(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 10px;\n  border: 1px solid cornflowerblue;\n  width: 100%;\n"], ["\n  padding: 10px;\n  border: 1px solid cornflowerblue;\n  width: 100%;\n"])));
var CustomInput = /** @class */ (function (_super) {
    __extends(CustomInput, _super);
    function CustomInput(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            value: props.value,
        };
        return _this;
    }
    CustomInput.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        if (prevProps.value !== this.props.value) {
            this.setState({
                value: this.props.value,
            });
        }
    };
    CustomInput.prototype.render = function () {
        var _this = this;
        return (React.createElement(Input, { className: "text-input", value: this.state.value, placeholder: this.props.placeholder || 'Value', onClick: function (e) { return e.stopPropagation(); }, onMouseUp: function (e) { return e.stopPropagation(); }, onMouseDown: function (e) { return e.stopPropagation(); }, onChange: function (e) {
                _this.setState({
                    value: e.target.value,
                }, function () {
                    if (_this.props.reactive) {
                        _this.props.onChange && _this.props.onChange({
                            name: 'points',
                            value: _this.state.value,
                        });
                    }
                });
            }, onBlur: function (e) {
                _this.props.onChange && _this.props.onChange({
                    name: 'points',
                    value: e.target.value,
                });
            } }));
    };
    return CustomInput;
}(React.Component));
exports.CustomInput = CustomInput;
var templateObject_1;
//# sourceMappingURL=CustomInput.js.map