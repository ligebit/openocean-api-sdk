// import Web3 from 'web3'
const axios = require('axios');

interface reqBaseVo {
  account: string,
  chainId: string
}

interface reqBanlanceVo extends reqBaseVo {
  inTokenAddress: string
}

class Api {
  public URL: string = 'https://open-api.openocean.finance'

  public getBalance(reqVo: reqBanlanceVo): Promise<any> {

    return new Promise((res, rej) => {
      axios({
        method: 'get',
        url: `${this.URL}/v1/cross/getBalance`,
        params: reqVo
      })
        .then((response: any) => {
          res(response.data)
        })
        .catch((error: any) => {
          rej(error.message || 'Error');
        });
    })
  }
  public getApprove() {

  }
  public approve() {

  }
  public quote() {

  }
  public swap() {

  }
  public getTokenPrice() {


  }
  public getTokeninfo() {

  }
}


export default Api
