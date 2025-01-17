export default function mapValues<Obj extends object, Res extends {
    [key in keyof Obj]: any;
}>(o: Obj, func: (value: Obj[keyof Obj]) => Res[Extract<keyof Obj, string>]): Res;
