// import Web3 from 'web3'

import { get } from "../utils/ajx";
import { config } from "../config";
import { ReqtransferVo, ReqTransactionReceiptVo, ChainName, ReqTransactionVo, ReqSwapVo, ReqBanlanceVo, ReqAllowanceVo, ReqTokenPriceVo, ReqTokenInfoVo, ReqQuoteVo } from "./vo/RequestVo";

export class Api {
  public UrlOpenApi: string = 'https://open-api.openocean.finance'
  public UrlCoingecKo: string = 'https://api.coingecko.com'

  @setChainId
  public async getBalance(option: ReqBanlanceVo): Promise<any> {
    return get(`${this.UrlOpenApi}/v1/cross/getBalance`, option, ReqBanlanceVo)
  }

  @setChainId
  public getAllowance(option: ReqAllowanceVo) {
    return get(`${this.UrlOpenApi}/v1/cross/getAllowance`, option, ReqAllowanceVo)
  }

  @setChainId
  public getGasPrice(option: any) {
    return get(`${this.UrlOpenApi}/v1/${option.chainId}/getGasPrice`, option, ChainName)
  }

  @setChainId
  public quote(option: ReqQuoteVo) {
    return get(`${this.UrlOpenApi}/v3/${option.chain}/quote`, option, ReqQuoteVo)
  }

  @setChainId
  public swapQuote(option: ReqSwapVo) {
    return get(`${this.UrlOpenApi}/v3/${option.chain}/swap_quote`, option, ReqSwapVo)
  }

  @setChainId
  public getTokenList(option: ChainName) {
    return get(`${this.UrlOpenApi}/v1/cross/tokenList`, option, ChainName)
  }

  @setChainId
  public createWallet(option: ChainName) {
    return get(`${this.UrlOpenApi}/v1/cross/createWallet`, option, ChainName)
  }

  @setChainId
  public getTransaction(option: ReqTransactionVo) {
    return get(`${this.UrlOpenApi}/v1/cross/getTransaction`, option, ReqTransactionVo)
  }

  @setChainId
  public getTransactionReceipt(option: ReqTransactionReceiptVo) {
    return get(`${this.UrlOpenApi}/v1/cross/getTransactionReceipt`, option, ReqTransactionReceiptVo)
  }

  @setChainId
  public transfer(option: ReqtransferVo) {
    return get(`${this.UrlOpenApi}/v1/cross/transfer`, option, ReqtransferVo)
  }

  @setChainId
  public getTokenPrice(option: ReqTokenPriceVo) {
    return get(`${this.UrlCoingecKo}/api/v3/simple/price`, option, ReqTokenPriceVo)
  }

  @setChainId
  public getTokenInfo(option: ReqTokenInfoVo) {
    return get(`${this.UrlCoingecKo}/api/v3/coins/${option.id}/contract/${option.contract_address}`, option, ReqTokenInfoVo)
  }

}

export let api = new Api()


function setChainId(target: any, method: string, descriptor: PropertyDescriptor) {
  const oldMethod = descriptor.value
  descriptor.value = function (...args: any[]) {
    args = args.map((item, i) => {
      if (item && item.chain) {
        item.chain = item.chain.toLowerCase()
        if (config.chains.chainObj[item.chain] && config.chains.chainObj[item.chain].chainId) {
          item.chainId = config.chains.chainObj[item.chain].chainId + ''
        }
      }
      return item
    })
    return oldMethod.apply(this, args)
  }
}

