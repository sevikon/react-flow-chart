"use strict";
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
exports.forEach = function (el, callback) {
    for (var key in el) {
        if (el.hasOwnProperty(key)) {
            callback(el[key]);
        }
    }
};
exports.calculatePaths = function (tasks, state) {
    var distances = {};
    var errors = [];
    if (state) {
        var links_1 = [];
        exports.forEach(state.links, function (val) {
            links_1.push(val);
        });
        var nodesMap_1 = {};
        exports.forEach(state.nodes, function (n) {
            var _a = n.properties, properties = _a === void 0 ? {} : _a;
            n.properties = __assign({}, properties, { task: tasks.filter(function (t) { return (t.id === properties.taskId); })[0], ascendants: [] });
            nodesMap_1[n.id] = n;
        });
        var calculateNodePath_1 = function (currentNode) {
            if (currentNode) {
                var _a = currentNode.properties, properties = _a === void 0 ? {} : _a;
                var _b = properties.task, task = _b === void 0 ? {} : _b;
                var distance_1 = task.points ? parseInt(task.points, 10) : 0;
                var ascendants = currentNode.properties.ascendants;
                ascendants.map(function (nodeId) {
                    var t = nodesMap_1[nodeId].properties.task;
                    var d = t && t.points ? parseInt(t.points, 10) : 0;
                    distance_1 += d;
                });
                distances[currentNode.id] = distance_1;
                nodesMap_1[currentNode.id] = currentNode;
                var nextNodes = links_1.filter(function (l) { return (l.from.nodeId === currentNode.id); }).map(function (l) { return l.to.nodeId; });
                nextNodes.map(function (nodeId) { return (calculateNodePath_1(nodesMap_1[nodeId])); });
            }
        };
        var generateAscendants_1 = function (currentNode) {
            if (currentNode) {
                var _a = currentNode.properties, properties = _a === void 0 ? {} : _a;
                var prevNodes = links_1.filter(function (l) { return (l.to.nodeId === currentNode.id); }).map(function (l) { return l.from.nodeId; });
                var ascendants_1 = currentNode.properties.ascendants;
                prevNodes.map(function (nodeId) {
                    if (ascendants_1.indexOf(nodeId) < 0) {
                        ascendants_1.push(nodeId);
                    }
                    var prevNode = nodesMap_1[nodeId];
                    if (prevNode) {
                        prevNode.properties.ascendants.map(function (nId) {
                            if (ascendants_1.indexOf(nId) < 0) {
                                ascendants_1.push(nId);
                            }
                        });
                    }
                });
                nodesMap_1[currentNode.id] = __assign({}, currentNode, { properties: __assign({}, properties, { ascendants: ascendants_1 }) });
                var nextNodes = links_1.filter(function (l) { return (l.from.nodeId === currentNode.id); }).map(function (l) { return l.to.nodeId; });
                nextNodes.map(function (nodeId) {
                    if (ascendants_1.indexOf(nodeId) < 0) {
                        generateAscendants_1(nodesMap_1[nodeId]);
                    }
                    else {
                        errors.push({
                            type: 'loop',
                            details: "Loop:  " + nodesMap_1[nodeId].properties.task.id + " -> " + nodesMap_1[currentNode.id].properties.task.id,
                        });
                    }
                });
            }
        };
        for (var property in nodesMap_1) {
            if (nodesMap_1.hasOwnProperty(property)) {
                var node = nodesMap_1[property];
                if (node.type === 'output-only') {
                    generateAscendants_1(node);
                }
            }
        }
        if (errors.length === 0) {
            for (var property in nodesMap_1) {
                if (nodesMap_1.hasOwnProperty(property)) {
                    var node = nodesMap_1[property];
                    if (node.type === 'output-only') {
                        calculateNodePath_1(node);
                    }
                }
            }
        }
    }
    return { distances: distances, errors: errors };
};
//# sourceMappingURL=calculate.js.map