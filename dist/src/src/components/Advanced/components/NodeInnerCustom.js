"use strict";
var __makeTemplateObject = (this && this.__makeTemplateObject) || function (cooked, raw) {
    if (Object.defineProperty) { Object.defineProperty(cooked, "raw", { value: raw }); } else { cooked.raw = raw; }
    return cooked;
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var styled_components_1 = require("styled-components");
var CustomInput_1 = require("./CustomInput");
var Outer = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\n  padding: 10px;\n  text-align: center;\n"], ["\n  padding: 10px;\n  text-align: center;\n"])));
var OuterTask = styled_components_1.default.div(templateObject_2 || (templateObject_2 = __makeTemplateObject(["\n  padding: 10px;\n"], ["\n  padding: 10px;\n"])));
var NodeInnerDefault = function (_a) {
    var node = _a.node, props = _a.props;
    var _b = node.properties, properties = _b === void 0 ? {} : _b;
    var _c = props.distances, distances = _c === void 0 ? {} : _c;
    var currentTask = props.tasks.filter(function (t) { return (t.id === properties.taskId); })[0];
    currentTask = currentTask ? currentTask : {
        id: '',
        title: '',
    };
    var distance = distances[node.id];
    if (node.type === 'output-only') {
        return (React.createElement(Outer, null,
            props.startContent && props.startContent(),
            !props.startContent && React.createElement("p", null, "START")));
    }
    else if (node.type === 'input-only') {
        return (React.createElement(Outer, null,
            props.endContent && props.endContent(distance),
            !props.endContent && React.createElement("div", null,
                React.createElement("p", null, "END"),
                React.createElement("div", { className: "distance" }, distance))));
    }
    else {
        return (React.createElement(OuterTask, null,
            props.taskContent && props.taskContent(currentTask),
            !props.taskContent && currentTask.id,
            !props.taskContent && React.createElement("div", { className: "distance" }, distance),
            !props.taskContent && React.createElement(CustomInput_1.CustomInput, { onChange: props.onChange, value: currentTask.points ? currentTask.points.toString() : '' }),
            React.createElement("i", { style: {
                    width: '24px', height: '24px',
                    position: 'absolute',
                    top: 0,
                    right: 0,
                }, onClick: function () {
                    props.onRemove({ node: node });
                } },
                React.createElement("svg", { style: { width: '24px', height: '24px', cursor: 'pointer' }, viewBox: "0 0 24 24" },
                    React.createElement("path", { d: "M19,6.41L17.59,5L12,10.59L6.41,5L5,6.41L10.59,12L5,17.59L6.41,19L12,13.41L17.59,19L19,17.59L13.41,12L19,6.41Z" })))));
    }
};
exports.NodeInnerDefaultWrapper = function (_a) {
    var node = _a.node, props = _a.props;
    return NodeInnerDefault({ node: node, props: props });
};
var templateObject_1, templateObject_2;
//# sourceMappingURL=NodeInnerCustom.js.map