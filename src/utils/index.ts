import { web3 } from "../utils/web3";


export class Utils {
  sleep(interval: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, interval);
    });
  }
  parseDecimals(sum: number, decimals: number): number {
    return web3.utils.toBN(sum).div(web3.utils.toBN(10 ** decimals)).toNumber()
  }
  formatDecimals(sum: number, decimals: number): number {
    return web3.utils.toBN(sum).mul(web3.utils.toBN(10 ** decimals)).toNumber()
  }
}

export const utils = new Utils()




