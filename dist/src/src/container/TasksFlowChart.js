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
var __1 = require("../");
var components_1 = require("../../stories/components");
var utils_1 = require("../components/Advanced/utils");
var ErrorDiv = styled_components_1.default.div(templateObject_1 || (templateObject_1 = __makeTemplateObject(["\npadding: 10px;\nmargin-bottom: 10px;\ncolor: #FFFFFF;\nbackground-color: #ec407a;\n"], ["\npadding: 10px;\nmargin-bottom: 10px;\ncolor: #FFFFFF;\nbackground-color: #ec407a;\n"])));
var TasksFlowChart = /** @class */ (function (_super) {
    __extends(TasksFlowChart, _super);
    function TasksFlowChart(props) {
        var _this = _super.call(this, props) || this;
        var _a = props.tasks, tasks = _a === void 0 ? [] : _a;
        _this.state = {
            chartProgress: {},
            chartRelations: utils_1.generateRelations(tasks),
            errors: [],
            taskFilter: '',
            tasks: tasks,
            added: [],
            refreshCode: 1,
            distances: {},
            nodes: {},
        };
        _this.getCurrentState = _this.getCurrentState.bind(_this);
        _this.recalculateDistances = _this.recalculateDistances.bind(_this);
        _this.filterTasks = _this.filterTasks.bind(_this);
        return _this;
    }
    TasksFlowChart.prototype.filterTasks = function (_a) {
        var value = _a.value;
        this.setState({
            taskFilter: value,
        });
    };
    TasksFlowChart.prototype.componentDidUpdate = function (prevProps, prevState, snapshot) {
        var _this = this;
        if (this.props.tasks !== prevProps.tasks) {
            this.setState({
                tasks: this.props.tasks,
            });
            if (this.props.refreshCode && this.props.refreshCode !== prevProps.refreshCode) {
                var _a = this.props.tasks, tasks = _a === void 0 ? [] : _a;
                this.setState({
                    chartProgress: {},
                    chartRelations: utils_1.generateRelations(tasks),
                    errors: [],
                    taskFilter: '',
                    tasks: tasks,
                    added: [],
                    distances: {},
                    nodes: {},
                }, function () {
                    _this.getCurrentState();
                });
            }
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
        var _b = utils_1.calculatePaths(tasks, state), chartProgress = _b.chartProgress, distances = _b.distances, errors = _b.errors, nodesMap = _b.nodesMap;
        var fixedTasks = utils_1.getTaskRelations(tasks, chartRelations);
        this.setState({
            chartProgress: chartProgress,
            distances: distances,
            errors: errors,
            tasks: fixedTasks,
            nodes: nodesMap,
        }, function () {
            onChange && onChange({
                chartProgress: chartProgress,
                chartRelations: chartRelations,
                tasks: tasks,
                distances: distances,
            });
        });
    };
    TasksFlowChart.prototype.refreshTasks = function (state, callback) {
        var added = this.state.added;
        utils_1.forEach(state.nodes, function (n) {
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
        var taskFilter = this.state.taskFilter;
        var filtered = this.state.tasks.filter(function (t) { return (_this.state.added.indexOf(t.id) < 0); }).filter(function (t) { return t.title.toLowerCase().indexOf(taskFilter.toLowerCase()) >= 0; });
        var editable = this.props.editable !== false;
        return (React.createElement(components_1.Page, null,
            React.createElement(components_1.Content, null,
                React.createElement(__1.FlowChartWithStateAdvanced, { editable: editable, chartProgress: this.state.chartProgress, closeButton: this.props.closeButton, backgroundImage: this.props.backgroundImage, startContent: this.props.startContent, endContent: this.props.endContent, taskContent: this.props.taskContent, refreshCode: this.state.refreshCode, tasks: this.state.tasks, nodes: this.state.nodes, distances: this.state.distances, initialValue: this.state.chartRelations, handleCreateRelation: this.props.handleCreateRelation, handleDeleteRelation: this.props.handleDeleteRelation, handleDeleteTaskRelations: this.props.handleDeleteTaskRelations, handleCallback: function (name, args, state) {
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
                                        if (editable) {
                                            _this.addTask(args[0].data.properties.taskId, function () {
                                                _this.recalculateDistances(state);
                                            });
                                        }
                                        break;
                                    }
                                    case 'onDeleteKey': {
                                        if (args.taskId) {
                                            if (editable) {
                                                _this.removeTask(args.taskId, function () {
                                                    _this.recalculateDistances(state);
                                                });
                                            }
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
                                        _this.refreshTasks(state, function () {
                                            _this.recalculateDistances(state);
                                        });
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
            React.createElement(components_1.Sidebar, { className: "sidebar" },
                this.state.errors.map(function (err) { return (React.createElement(ErrorDiv, null,
                    "ERROR: ",
                    err.type,
                    " : ",
                    err.details)); }),
                React.createElement(__1.CustomInput, { placeholder: this.props.searchPlaceholder, reactive: true, onChange: this.filterTasks, value: taskFilter }),
                filtered.map(function (t) { return (React.createElement(components_1.SidebarItem, { key: "task-" + t.id, type: t.title, properties: {
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