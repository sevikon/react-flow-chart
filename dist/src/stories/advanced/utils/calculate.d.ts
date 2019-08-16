import { IChart } from '../../../src/types';
import { IRelationErrorArray, ITaskGroupType } from '../types';
export declare const forEach: (el: object, callback: (val: any) => void) => void;
export declare const calculatePaths: (tasks: ITaskGroupType, state?: IChart | undefined) => {
    distances: {};
    errors: IRelationErrorArray;
};
