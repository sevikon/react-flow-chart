import * as React from 'react';
/**
 * State is external to the <FlowChart> Element
 *
 * You could easily move this state to Redux or similar by creating your own callback actions.
 */
export declare class ExternalReactState extends React.Component {
    state: import("./index").IChart;
    render(): JSX.Element;
}
