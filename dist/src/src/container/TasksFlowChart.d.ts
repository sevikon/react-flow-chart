import * as React from 'react';
import { IChart } from '../types';
import { ITasksFlowChart, ITasksFlowChartState, IUpdateTask } from '../components/Advanced/types';
export declare class TasksFlowChart extends React.Component<ITasksFlowChart, ITasksFlowChartState> {
    constructor(props: ITasksFlowChart);
    componentDidUpdate(prevProps: Readonly<ITasksFlowChart>, prevState: Readonly<ITasksFlowChartState>, snapshot?: any): void;
    removeTask(taskId: string, callback: () => void): void;
    addTask(taskId: string, callback: () => void): void;
    updateTask({ taskId, name, value }: IUpdateTask, callback: () => void): void;
    getCurrentState(): void;
    recalculateDistances(state: IChart): void;
    refreshTasks(state: IChart, callback: () => void): void;
    render(): JSX.Element;
}
