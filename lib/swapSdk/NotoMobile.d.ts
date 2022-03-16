export declare class NotoMobile {
    error: Function;
    $on(key: string, callBack: Function): void;
    id: string;
    qrCode: string;
    constructor(qrData: any);
    show(): void;
}
