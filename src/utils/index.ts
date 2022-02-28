

export class Utils {
  sleep(interval: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, interval);
    });
  }
}

export const utils = new Utils()




