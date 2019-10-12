import * as React from 'react';
/** A little HOC to throttle component renders */
export declare const throttleRender: (wait: number, options?: any) => (ComponentToThrottle: any) => {
    new (props: any, context: any): {
        throttledSetState: any;
        shouldComponentUpdate(nextProps: any, nextState: any): boolean;
        componentWillMount(): void;
        componentWillReceiveProps(nextProps: any): void;
        componentWillUnmount(): void;
        render(): JSX.Element;
        context: any;
        setState<K extends string | number | symbol>(state: any, callback?: (() => void) | undefined): void;
        forceUpdate(callBack?: (() => void) | undefined): void;
        readonly props: Readonly<any> & Readonly<{
            children?: React.ReactNode;
        }>;
        state: Readonly<any>;
        refs: {
            [key: string]: React.ReactInstance;
        };
    };
    contextType?: React.Context<any> | undefined;
};
