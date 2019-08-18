import * as React from 'react';
import { ICustomInputParams } from '../../types';
export declare class CustomInput extends React.Component<ICustomInputParams, {
    value: string;
}> {
    constructor(props: ICustomInputParams);
    componentDidUpdate(prevProps: Readonly<ICustomInputParams>, prevState: Readonly<{
        value: string;
    }>, snapshot?: any): void;
    render(): JSX.Element;
}
