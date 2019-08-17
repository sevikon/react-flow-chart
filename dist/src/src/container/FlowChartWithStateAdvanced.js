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
var __1 = require("../");
var CanvasOuterCustom_1 = require("../components/Advanced/CanvasOuterCustom");
var index_1 = require("../index");
var actions = require("./actions");
var mapValues_1 = require("./utils/mapValues");
/**
 * Flow Chart With State
 */
var FlowChartWithStateAdvanced = /** @class */ (function (_super) {
    __extends(FlowChartWithStateAdvanced, _super);
    function FlowChartWithStateAdvanced(props) {
        var _this = _super.call(this, props) || this;
        _this.stateActions = mapValues_1.default(actions, function (func) {
            return function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this.setState(func.apply(void 0, args));
            };
        });
        _this.state = props.initialValue;
        _this.canvas = props.backgroundImage ? CanvasOuterCustom_1.CanvasOuterCustomImageFunc(props.backgroundImage) : __1.CanvasOuterDefault;
        return _this;
    }
    FlowChartWithStateAdvanced.prototype.componentDidMount = function () {
        this.handleCallback('refreshTasks');
    };
    FlowChartWithStateAdvanced.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        if (this.props.refreshCode !== prevProps.refreshCode) {
            this.handleCallback('refreshState');
        }
        else if (this.props.tasks !== prevProps.tasks) {
            this.handleCallback('refreshState');
        }
        if (this.props.nodes !== prevProps.nodes) {
            this.setState({
                nodes: this.props.nodes,
            });
        }
    };
    FlowChartWithStateAdvanced.prototype.handleCallback = function (funcName, args) {
        var handleCallback = this.props.handleCallback;
        handleCallback && handleCallback(funcName, args, this.state);
    };
    FlowChartWithStateAdvanced.prototype.render = function () {
        var _this = this;
        var _a = this.props, Components = _a.Components, tasks = _a.tasks, distances = _a.distances;
        var callbacks = __assign({}, this.stateActions, { onLinkComplete: function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                var data = args[0];
                // fix link -> always should be from port2 to port1
                if (data.fromPortId === 'port1') {
                    args[0] = __assign({}, data, { fromPortId: 'port2', fromNodeId: data.toNodeId, toNodeId: data.fromNodeId, toPortId: 'port1' });
                    data = args[0];
                    var linksFixed = _this.state.links;
                    var link = linksFixed[data.linkId];
                    var from = {
                        nodeId: data.fromNodeId || '',
                        portId: data.fromPortId || '',
                    };
                    if (link && link.to) {
                        linksFixed[link.id] = __assign({}, link, { from: from, to: link.from });
                    }
                    _this.setState({
                        links: linksFixed,
                    });
                }
                if (data.fromPortId === data.toPortId) {
                    var funcArgs = { linkId: data.linkId };
                    _this.setState(_this.stateActions.onLinkClick(funcArgs), function () { return callbacks.onDeleteKey(); });
                }
                else {
                    var fromNode = _this.state.nodes[data.fromNodeId];
                    var toNode = _this.state.nodes[data.toNodeId];
                    var from = fromNode.properties.task;
                    var to = toNode.properties.task;
                    if (from && to && _this.props.handleCreateRelation) {
                        _this.props.handleCreateRelation({
                            from: from,
                            to: to,
                        });
                    }
                    _this.setState((_a = _this.stateActions).onLinkComplete.apply(_a, args), function () { return _this.handleCallback('onLinkComplete', args); });
                }
            }, onDeleteKey: function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this.setState((_a = _this.stateActions).onDeleteKey.apply(_a, args), function () { return _this.handleCallback.apply(_this, ['onDeleteKey'].concat(args)); });
            }, onCanvasDrop: function () {
                var _a;
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                _this.setState((_a = _this.stateActions).onCanvasDrop.apply(_a, args), function () { return _this.handleCallback('onCanvasDrop', args); });
            } });
        return (React.createElement(index_1.FlowChart, { chart: this.state, callbacks: callbacks, Components: __assign({}, Components, { CanvasOuter: this.canvas, Node: __1.NodeCustom, Port: __1.PortCustom, NodeInner: function (_a) {
                    var node = _a.node;
                    return __1.NodeInnerDefaultWrapper({
                        node: node,
                        props: {
                            startContent: _this.props.startContent,
                            endContent: _this.props.endContent,
                            taskContent: _this.props.taskContent,
                            tasks: tasks,
                            distances: distances,
                            onRemove: function (_a) {
                                var nodeInner = _a.node;
                                var data = { nodeId: nodeInner.id, taskId: nodeInner.properties.taskId };
                                if (nodeInner.properties.task) {
                                    _this.props.handleDeleteTaskRelations && _this.props.handleDeleteTaskRelations(nodeInner.properties.task);
                                }
                                _this.setState(_this.stateActions.onNodeClick(data), function () { return callbacks.onDeleteKey(data); });
                            },
                            onChange: function (_a) {
                                var name = _a.name, value = _a.value;
                                _this.handleCallback('onNodeChange', {
                                    node: node,
                                    name: name,
                                    value: value,
                                });
                            },
                        },
                    });
                }, Link: function (props) { return __1.LinkCustomWrapper(__assign({}, props), { nodes: _this.state.nodes }, {
                    onDelete: function (link) {
                        if (link.from.nodeId && link.to.nodeId) {
                            var fromNode = _this.state.nodes[link.from.nodeId];
                            var toNode = _this.state.nodes[link.to.nodeId];
                            var from = fromNode.properties.task;
                            var to = toNode.properties.task;
                            if (from && to && _this.props.handleDeleteRelation) {
                                _this.props.handleDeleteRelation({
                                    from: from,
                                    to: to,
                                });
                            }
                        }
                        var data = { linkId: link.id };
                        _this.setState(_this.stateActions.onLinkClick(data), function () { return callbacks.onDeleteKey(data); });
                    },
                }); } }) }));
    };
    return FlowChartWithStateAdvanced;
}(React.Component));
exports.FlowChartWithStateAdvanced = FlowChartWithStateAdvanced;
//# sourceMappingURL=FlowChartWithStateAdvanced.js.map