// import Web3 from 'web3'
const axios = require('axios');
import { validate } from 'class-validator'
import { plainToClass } from 'class-transformer'


import { Approve, ReqAllowanceVo } from "./vo/Approve";
import { ReqBanlanceVo } from "./vo/Balance";


export class Api {
  public URL: string = 'https://open-api.openocean.finance'


  private async _validate(vo: any, option: any) {
    const reqAllowanceVo = plainToClass(vo, option)
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
  private async _get(url: string, option: any, vo: any): Promise<any> {
    return new Promise(async (resolve, reject) => {
      try {
        const errors = await this._validate(vo, option)
        if (errors) {
          reject({
            code: 400,
            message: errors
          });
        } else {
          axios({
            method: 'get',
            url: `${this.URL}${url}`,
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

  public async getBalance(option: ReqBanlanceVo): Promise<any> {
    return this._get('/v1/cross/getBalance', option, ReqBanlanceVo)
  }

  public getAllowance(option: ReqAllowanceVo) {
    return this._get('/v1/cross/getAllowance', option, ReqAllowanceVo)
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
  public getTokenPrice() {


  }
  public getTokeninfo() {

  }
}


