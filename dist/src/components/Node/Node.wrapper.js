"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var react_draggable_1 = require("react-draggable");
var __1 = require("../../");
var Node_default_1 = require("./Node.default");
exports.NodeWrapper = function (_a) {
    var node = _a.node, onDragNode = _a.onDragNode, onNodeClick = _a.onNodeClick, isSelected = _a.isSelected, _b = _a.Component, Component = _b === void 0 ? Node_default_1.NodeDefault : _b, onNodeSizeChange = _a.onNodeSizeChange, NodeInner = _a.NodeInner, Ports = _a.Ports, Port = _a.Port, offset = _a.offset, selected = _a.selected, selectedLink = _a.selectedLink, hovered = _a.hovered, hoveredLink = _a.hoveredLink, onPortPositionChange = _a.onPortPositionChange, onLinkStart = _a.onLinkStart, onLinkMove = _a.onLinkMove, onLinkComplete = _a.onLinkComplete, onLinkCancel = _a.onLinkCancel;
    var _c = React.useState({ width: 0, height: 0 }), size = _c[0], setSize = _c[1];
    var compRef = React.useRef(null);
    // TODO: probably should add an observer to track node component size changes
    React.useLayoutEffect(function () {
        var el = compRef.current;
        if (el) {
            if (size.width !== el.offsetWidth || size.height !== el.offsetHeight) {
                var newSize = { width: el.offsetWidth, height: el.offsetHeight };
                setSize(newSize);
                onNodeSizeChange({ nodeId: node.id, size: newSize });
            }
        }
    }, [node, compRef.current, size.width, size.height]);
    var children = (React.createElement(React.Fragment, null,
        React.createElement(NodeInner, { node: node }),
        React.createElement(Ports, null, Object.keys(node.ports).map(function (portId) { return (React.createElement(__1.PortWrapper, { key: portId, offset: offset, selected: selected, selectedLink: selectedLink, hoveredLink: hoveredLink, hovered: hovered, node: node, port: node.ports[portId], Component: Port, onPortPositionChange: onPortPositionChange, onLinkStart: onLinkStart, onLinkMove: onLinkMove, onLinkComplete: onLinkComplete, onLinkCancel: onLinkCancel })); }))));
    return (React.createElement(react_draggable_1.default, { bounds: "parent", axis: "both", position: node.position, grid: [1, 1], onStart: function (e) {
            // Stop propagation so the canvas does not move
            e.stopPropagation();
        }, onDrag: function (e, dragData) { return onDragNode(e, dragData, node.id); } },
        React.createElement(Component, { ref: compRef, children: children, onClick: function (e) {
                onNodeClick({ nodeId: node.id });
                e.stopPropagation();
            }, isSelected: isSelected, node: node })));
};
//# sourceMappingURL=Node.wrapper.js.map