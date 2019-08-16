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
var components_1 = require("../../stories/components");
var __1 = require("../");
var calculate_1 = require("../components/Advanced/utils/calculate");
var generateRelations_1 = require("../components/Advanced/utils/generateRelations");
var getTaskRelations_1 = require("../components/Advanced/utils/getTaskRelations");
var ErrorDiv = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\npadding: 10px;\nmargin-bottom: 10px;\ncolor: #FFFFFF;\nbackground-color: #ec407a;\n"], ["\npadding: 10px;\nmargin-bottom: 10px;\ncolor: #FFFFFF;\nbackground-color: #ec407a;\n"])));
var TasksFlowChart = /** @class */ (function (_super) {
    __extends(TasksFlowChart, _super);
    function TasksFlowChart(props) {
        var _this = _super.call(this, props) || this;
        var _a = props.tasks, tasks = _a === void 0 ? [] : _a;
        _this.state = {
            errors: [],
            tasks: tasks,
            added: [],
            refreshCode: 1,
            distances: {},
            chartRelations: generateRelations_1.generateRelations(_this.props.tasks),
        };
        _this.getCurrentState = _this.getCurrentState.bind(_this);
        _this.recalculateDistances = _this.recalculateDistances.bind(_this);
        return _this;
    }
    TasksFlowChart.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        if (this.props.tasks !== prevProps.tasks) {
            this.setState({
                tasks: this.props.tasks,
            });
        }
    };
    TasksFlowChart.prototype.removeTask = function (taskId, callback) {
        this.setState({
            added: this.state.added.filter(function (t) { return t !== taskId; }),
        }, callback);
    };
    TasksFlowChart.prototype.addTask = function (taskId, callback) {
        var added = this.state.added;
        added.push(taskId);
        this.setState({
            added: added,
        }, callback);
    };
    TasksFlowChart.prototype.updateTask = function (_a, callback) {
        var taskId = _a.taskId, name = _a.name, value = _a.value;
        var tasks = this.state.tasks.map(function (t) {
            if (t.id === taskId) {
                t[name] = value;
            }
            return t;
        }, callback);
        this.setState({
            tasks: tasks,
        });
    };
    TasksFlowChart.prototype.getCurrentState = function () {
        this.setState({
            refreshCode: this.state.refreshCode + 1,
        });
    };
    TasksFlowChart.prototype.recalculateDistances = function (state) {
        var _a = this.state, chartRelations = _a.chartRelations, tasks = _a.tasks;
        var onChange = this.props.onChange;
        var _b = calculate_1.calculatePaths(tasks, state), distances = _b.distances, errors = _b.errors;
        var fixedTasks = getTaskRelations_1.getTaskRelations(tasks, chartRelations);
        this.setState({
            distances: distances,
            errors: errors,
            tasks: fixedTasks,
        }, function () {
            onChange && onChange({
                chartRelations: chartRelations,
                tasks: tasks,
                distances: distances,
            });
        });
    };
    TasksFlowChart.prototype.refreshTasks = function (state, callback) {
        var added = this.state.added;
        calculate_1.forEach(state.nodes, function (n) {
            var _a = n.properties, properties = _a === void 0 ? {} : _a;
            if (properties.taskId) {
                added.push(properties.taskId);
            }
        });
        this.setState({
            added: added,
        }, callback);
    };
    TasksFlowChart.prototype.render = function () {
        var _this = this;
        return (React.createElement(components_1.Page, null,
            React.createElement(components_1.Content, null,
                React.createElement(__1.FlowChartWithStateAdvanced, { startContent: this.props.startContent, endContent: this.props.endContent, taskContent: this.props.taskContent, refreshCode: this.state.refreshCode, tasks: this.state.tasks, distances: this.state.distances, initialValue: this.state.chartRelations, handleCreateRelation: this.props.handleCreateRelation, handleDeleteRelation: this.props.handleDeleteRelation, handleDeleteTaskRelations: this.props.handleDeleteTaskRelations, handleCallback: function (name, args, state) {
                        if (state) {
                            if (args) {
                                switch (name) {
                                    case 'onNodeChange': {
                                        if (args.node && args.name && args.value !== undefined) {
                                            if (args.node.properties.task) {
                                                _this.props.handleUpdateTask && _this.props.handleUpdateTask(args.node.properties.task);
                                            }
                                            _this.updateTask({ name: args.name, value: args.value, taskId: args.node.properties.taskId }, function () {
                                                _this.recalculateDistances(state);
                                            });
                                        }
                                        break;
                                    }
                                    case 'onCanvasDrop': {
                                        _this.addTask(args[0].data.properties.taskId, function () {
                                            _this.recalculateDistances(state);
                                        });
                                        break;
                                    }
                                    case 'onDeleteKey': {
                                        if (args.taskId) {
                                            _this.removeTask(args.taskId, function () {
                                                _this.recalculateDistances(state);
                                            });
                                        }
                                        else if (args.linkId) {
                                            _this.recalculateDistances(state);
                                        }
                                        break;
                                    }
                                    case 'onLinkComplete': {
                                        _this.recalculateDistances(state);
                                    }
                                }
                            }
                            else {
                                switch (name) {
                                    case 'refreshState': {
                                        _this.recalculateDistances(state);
                                        break;
                                    }
                                    case 'refreshTasks': {
                                        _this.refreshTasks(state, function () {
                                            _this.recalculateDistances(state);
                                        });
                                        break;
                                    }
                                }
                            }
                        }
                    } })),
            React.createElement(components_1.Sidebar, null,
                this.state.errors.map(function (err) { return (React.createElement(ErrorDiv, null,
                    "ERROR: ",
                    err.type,
                    " : ",
                    err.details)); }),
                this.state.tasks.filter(function (t) { return (_this.state.added.indexOf(t.id) < 0); }).map(function (t) { return (React.createElement(components_1.SidebarItem, { key: "task-" + t.id, type: t.title, properties: {
                        taskId: t.id,
                    }, ports: {
                        port1: {
                            id: 'port1',
                            type: 'left',
                            properties: {},
                        },
                        port2: {
                            id: 'port2',
                            type: 'right',
                            properties: {},
                        },
                    } })); }))));
    };
    return TasksFlowChart;
}(React.Component));
exports.TasksFlowChart = TasksFlowChart;
var templateObject_1;
//# sourceMappingURL=TasksFlowChart.js.map