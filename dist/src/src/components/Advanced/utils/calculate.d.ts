import { IChart } from '../../../types';
import { IRelationErrorArray, ITaskGroupType } from '../../../types/advanced';
export declare const forEach: (el: object, callback: (val: any) => void) => void;
export declare const calculatePaths: (tasks: ITaskGroupType, state?: IChart | undefined) => {
    distances: {};
    errors: IRelationErrorArray;
};
