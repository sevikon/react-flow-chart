import * as React from 'react';
import { IChart } from '../../index';
import { ICallbackArgsType, IFlowChartWithStateProps } from './types';
/**
 * Flow Chart With State
 */
export declare class FlowChartWithStateAdvanced extends React.Component<IFlowChartWithStateProps, IChart> {
    state: IChart;
    private stateActions;
    constructor(props: IFlowChartWithStateProps);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<IFlowChartWithStateProps>, prevState: Readonly<IChart>, snapshot?: any): void;
    handleCallback(funcName: string, args?: ICallbackArgsType): void;
    render(): JSX.Element;
}
