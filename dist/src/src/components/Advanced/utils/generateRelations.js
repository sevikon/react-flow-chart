"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getStart(id, x, y) {
    return { id: id, type: 'output-only', position: { x: x, y: y }, ports: { port2: { id: 'port2', type: 'right', position: { x: 133, y: 65 } } } };
}
function getEnd(id, x, y) {
    return { id: id, type: 'input-only', position: { x: x, y: y }, ports: { port1: { id: 'port1', type: 'left', position: { x: -2, y: 65 } } } };
}
function getRandomId(length) {
    if (length === void 0) { length = 24; }
    var result = '';
    var characters = 'abcdefghijklmnopqrstuvwxyz0123456789-';
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}
function getNode(id, t, x, y) {
    return {
        id: id,
        position: { x: x, y: y },
        type: 'task',
        ports: {
            port1: { id: 'port1', type: 'left', properties: {}, position: { x: -2, y: 50 } },
            port2: { id: 'port2', type: 'right', properties: {}, position: { x: 242, y: 50 } },
        },
        properties: { taskId: t.id },
    };
}
function generateRelations(tasks) {
    var nodeStartId = getRandomId();
    var nodeEndId = getRandomId();
    var start = {
        x: 20,
        y: 20,
        w: 130,
        h: 130,
    };
    var margin = {
        x: 120,
        y: 20,
    };
    var block = {
        w: 200,
        h: 100,
    };
    var nodes = {};
    var links = {};
    var maxWidth = 1;
    var row = 0;
    var maxColumn = 0;
    var tasksMap = {};
    tasks.map(function (t) {
        var parents = t.dependencies ? t.dependencies : [];
        tasksMap[t.id] = { id: getRandomId(), parents: parents, children: [], left: 0, blockHeight: 1, blockWidth: 1, task: t, visited: false };
    });
    var addChild = function (taskParentId, taskId) {
        tasksMap[taskParentId].children.push(taskId);
    };
    var _loop_1 = function (property) {
        if (tasksMap.hasOwnProperty(property)) {
            if (tasksMap[property].parents.length > 0) {
                tasksMap[property].task.dependencies.map(function (taskParentId) {
                    addChild(taskParentId, tasksMap[property].task.id);
                });
            }
        }
    };
    for (var property in tasksMap) {
        _loop_1(property);
    }
    var calculateBlockHeight = function (taskId) {
        var node = tasksMap[taskId];
        if (!node.visited) {
            var blockHeight_1 = node.children.length;
            if (blockHeight_1 < 1) {
                blockHeight_1 = blockHeight_1 < 1 ? 1 : blockHeight_1;
            }
            else {
                blockHeight_1 = 0;
                node.children.map(function (taskChildId) {
                    var childHeight = tasksMap[taskChildId].blockHeight;
                    blockHeight_1 += childHeight;
                });
            }
            node.blockHeight = blockHeight_1;
            node.visited = true;
            node.parents.map(function (taskParentId) {
                calculateBlockHeight(taskParentId);
            });
        }
    };
    for (var property in tasksMap) {
        if (tasksMap.hasOwnProperty(property)) {
            var node = tasksMap[property];
            if (node.children.length === 0) {
                calculateBlockHeight(node.task.id);
            }
        }
    }
    var getLink = function (id, fromId, toId) {
        if (!nodes[fromId] || !nodes[toId]) {
            return null;
        }
        return {
            id: id,
            from: { nodeId: fromId, portId: 'port2' },
            to: { nodeId: toId, portId: 'port1' },
        };
    };
    var generateNode = function (taskId, column, currentRow) {
        if (column > maxColumn) {
            maxColumn = column;
        }
        var node = tasksMap[taskId];
        if (!nodes[node.id]) {
            if (node.children.length > 0 || node.parents.length > 0 || node.task.points > 0) {
                nodes[node.id] = getNode(node.id, node.task, start.x + start.w + margin.x + (margin.x + block.w) * (node.children.length === 0 ? maxColumn : column), start.y + currentRow * (block.h + margin.y));
            }
            var innerRow_1 = currentRow;
            node.children.map(function (c) {
                generateNode(c, column + 1, innerRow_1);
                innerRow_1 = innerRow_1 + tasksMap[c].blockHeight;
            });
        }
    };
    for (var property in tasksMap) {
        if (tasksMap.hasOwnProperty(property)) {
            var node = tasksMap[property];
            if (node.parents.length === 0) {
                generateNode(property, 0, row);
                row = row + node.blockHeight;
            }
        }
    }
    nodes[nodeStartId] = getStart(nodeStartId, start.x, start.y);
    nodes[nodeEndId] = getEnd(nodeEndId, start.x + start.w + 2 * margin.x + (maxColumn + 1) * (margin.x + block.w), start.y);
    for (var property in tasksMap) {
        if (tasksMap.hasOwnProperty(property)) {
            var node = tasksMap[property];
            if (node.blockWidth > maxWidth) {
                maxWidth = node.blockWidth;
            }
            if (node.children.length === 0) {
                var linkId = getRandomId();
                var link = getLink(linkId, node.id, nodeEndId);
                if (link) {
                    links[linkId] = link;
                }
            }
            if (node.parents.length === 0) {
                var linkId = getRandomId();
                var link = getLink(linkId, nodeStartId, node.id);
                if (link) {
                    links[linkId] = link;
                }
            }
        }
    }
    var _loop_2 = function (property) {
        if (tasksMap.hasOwnProperty(property)) {
            var currentNode_1 = tasksMap[property];
            var t = currentNode_1.task;
            if (t.dependencies) {
                t.dependencies.map(function (taskId) {
                    var linkId = getRandomId();
                    var link = getLink(linkId, tasksMap[taskId].id, currentNode_1.id);
                    if (link) {
                        links[linkId] = link;
                    }
                });
            }
        }
    };
    for (var property in tasksMap) {
        _loop_2(property);
    }
    return {
        offset: {
            x: 0,
            y: 0,
        },
        nodes: nodes,
        links: links,
        selected: {},
        hovered: {},
    };
}
exports.generateRelations = generateRelations;
//# sourceMappingURL=generateRelations.js.map