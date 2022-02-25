// import Web3 from 'web3'
const axios = require('axios');
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'


import { Approve } from "./vo/Approve";
import { ReqBanlanceVo, ReqAllowanceVo, ReqTokenPriceVo,ReqTokenInfoVo } from "./vo/RequestVo";

export class Api {
  public UrlOpenApi: string = 'https://open-api.openocean.finance'
  public UrlCoingecKo: string = 'https://api.coingecko.com'


  public async getBalance(option: ReqBanlanceVo): Promise<any> {
    return this._get(`${this.UrlOpenApi}/v1/cross/getBalance`, option, ReqBanlanceVo)
  }

  public getAllowance(option: ReqAllowanceVo) {
    return this._get(`${this.UrlOpenApi}/v1/cross/getAllowance`, option, ReqAllowanceVo)
  }

  public approve(params: object) {
    let sd = new Approve(params)
    let b = sd.send()

    setTimeout(() => {
      if (sd.errorCallback) sd.errorCallback(b)
    }, 100);
    return sd
  }

  public quote() {

  }
  public swap() {

  }
  public getTokenPrice(option: ReqTokenPriceVo) {
    return this._get(`${this.UrlCoingecKo}/api/v3/simple/price`, option, ReqTokenPriceVo)
  }
  public getTokenInfo(option: ReqTokenInfoVo) {
    return this._get(`${this.UrlCoingecKo}/api/v3/coins/${option.id}/contract/${option.contract_address}`, option, ReqTokenInfoVo)
  }

  private async _validate<T>(option: T, vo: any) {
    const reqAllowanceVo = plainToClass<Object, Object>(vo, option)
    let errors = await validate(reqAllowanceVo)
    if (errors.length) {
      return errors.reduce((o: any[], n: any): string[] => {
        Object.keys(n.constraints).forEach((key: any) => {
          o.push(n.constraints[key])
        })
        return o
      }, []).join('.')
    }
    return
  }
  private async _get<T, V>(url: string, option: T, vo: V): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const errors = await this._validate<T>(option, vo)
        if (errors) {
          reject({
            code: 400,
            message: errors
          });
        } else {
          axios({
            method: 'get',
            url: `${url}`,
            params: option
          })
            .then((response: any) => {
              resolve(response.data)
            })
            .catch((error: any) => {
              reject(error ? error.message : 'An unknown error');
            });
        }
      } catch (error) {
        reject({
          code: 800,
          message: error || 'An unknown error'
        });
      }
    })
  }
}


