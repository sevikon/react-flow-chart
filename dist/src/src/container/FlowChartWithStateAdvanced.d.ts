import * as React from 'react';
import { ICallbackArgsType, IFlowChartWithStatePropsAdvanced } from '../';
import { IChart } from '../index';
/**
 * Flow Chart With State
 */
export declare class FlowChartWithStateAdvanced extends React.Component<IFlowChartWithStatePropsAdvanced, IChart> {
    state: IChart;
    private stateActions;
    private canvas?;
    constructor(props: IFlowChartWithStatePropsAdvanced);
    componentDidMount(): void;
    componentDidUpdate(prevProps: Readonly<IFlowChartWithStatePropsAdvanced>, prevState: Readonly<IChart>, snapshot?: any): void;
    handleCallback(funcName: string, args?: ICallbackArgsType): void;
    render(): JSX.Element;
}
