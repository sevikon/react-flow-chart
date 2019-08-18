"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getTaskRelations(tasks, chartRelations) {
    var links = chartRelations.links, nodes = chartRelations.nodes;
    var relations = [];
    var tasksMap = {};
    for (var property in links) {
        if (links.hasOwnProperty(property)) {
            var link = links[property];
            var from = link.from.nodeId;
            var to = link.to.nodeId;
            if (from && to) {
                var nodeFrom = nodes[from];
                var nodeTo = nodes[to];
                if (nodeFrom && nodeTo) {
                    var taskFrom = nodeFrom.properties && nodeFrom.properties.task;
                    var taskTo = nodeTo.properties && nodeTo.properties.task;
                    if (taskFrom && taskTo) {
                        relations.push({
                            from: taskFrom.id,
                            to: taskTo.id,
                        });
                    }
                }
            }
        }
    }
    tasks.map(function (t) {
        tasksMap[t.id] = [];
    });
    relations.map(function (r) {
        tasksMap[r.from].push(r.to);
    });
    tasks.map(function (t) {
        t.dependencies = tasksMap[t.id];
    });
    return tasks;
}
exports.getTaskRelations = getTaskRelations;
//# sourceMappingURL=getTaskRelations.js.map