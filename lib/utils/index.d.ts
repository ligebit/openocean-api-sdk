export declare class Utils {
    sleep(interval: number): Promise<unknown>;
    parseDecimals(sum: number, decimals: number): number;
    formatDecimals(sum: number, decimals: number): number;
}
export declare const utils: Utils;
