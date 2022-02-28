// import Web3 from 'web3'

import { get } from "../utils/ajx";

import { Approve } from "./vo/Approve";
import { ReqApproveVo, ReqtransferVo, ReqTransactionReceiptVo, ReqBase, ReqTransactionVo, ReqSwapVo, ReqBanlanceVo, ReqAllowanceVo, ReqTokenPriceVo, ReqTokenInfoVo, ReqQuoteVo } from "./vo/RequestVo";
export class Api {
  public UrlOpenApi: string = 'https://open-api.openocean.finance'
  public UrlCoingecKo: string = 'https://api.coingecko.com'

  public approve(params: object) {
    let sd = new Approve(params)
    let b = sd.send()

    setTimeout(() => {
      if (sd.errorCallback) sd.errorCallback(b)
    }, 100);
    return sd
  }


  public async getBalance(option: ReqBanlanceVo): Promise<any> {
    return get(`${this.UrlOpenApi}/v1/cross/getBalance`, option, ReqBanlanceVo)
  }

  public getAllowance(option: ReqAllowanceVo) {
    return get(`${this.UrlOpenApi}/v1/cross/getAllowance`, option, ReqAllowanceVo)
  }


  public getGasPrice(option: ReqBase) {
    return get(`${this.UrlOpenApi}/v1/${option.chainId}/getGasPrice`, option, ReqBase)
  }
  public quote(option: ReqQuoteVo) {
    return get(`${this.UrlOpenApi}/v1/cross/quote`, option, ReqQuoteVo)
  }

  public swap(option: ReqSwapVo) {
    return get(`${this.UrlOpenApi}/v1/cross/swap`, option, ReqSwapVo)
  }

  public getTokenList(option: ReqBase) {
    return get(`${this.UrlOpenApi}/v1/cross/tokenList`, option, ReqBase)
  }
  public createWallet(option: ReqBase) {
    return get(`${this.UrlOpenApi}/v1/cross/createWallet`, option, ReqBase)
  }

  public getTransaction(option: ReqTransactionVo) {
    return get(`${this.UrlOpenApi}/v1/cross/getTransaction`, option, ReqTransactionVo)
  }
  public getTransactionReceipt(option: ReqTransactionReceiptVo) {
    return get(`${this.UrlOpenApi}/v1/cross/getTransactionReceipt`, option, ReqTransactionReceiptVo)
  }

  public transfer(option: ReqtransferVo) {
    return get(`${this.UrlOpenApi}/v1/cross/transfer`, option, ReqtransferVo)
  }

  public getTokenPrice(option: ReqTokenPriceVo) {
    return get(`${this.UrlCoingecKo}/api/v3/simple/price`, option, ReqTokenPriceVo)
  }
  public getTokenInfo(option: ReqTokenInfoVo) {
    return get(`${this.UrlCoingecKo}/api/v3/coins/${option.id}/contract/${option.contract_address}`, option, ReqTokenInfoVo)
  }

}


