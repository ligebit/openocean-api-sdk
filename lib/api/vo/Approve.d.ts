import 'reflect-metadata';
export declare class Approve {
    params: any;
    errorCallback: Function;
    transactionHashCallback: Function;
    constructor(params: any);
    send(): any;
    on(events: string, callback: Function): void;
}
