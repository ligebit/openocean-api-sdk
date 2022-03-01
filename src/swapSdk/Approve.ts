import { ReqApproveVo } from "./RequestVo";
export class Approve {
  errorCallback: Function = () => { }
  transactionHashCallback: Function = () => { }
  receiptCallback: Function = () => { }
  successCallback: Function = () => { }
  contract: any
  contractAddress: string
  tokenAddress: string
  account: string
  amount: string
  key: number

  constructor(contract: any) {
    this.contract = contract
  }

  async send(reqApproveVo: ReqApproveVo, address: string) {
    this.account = address
    this.key = 0
    this.contractAddress = reqApproveVo.contractAddress
    this.tokenAddress = reqApproveVo.tokenAddress
    // this.getSuccess()

    if (!reqApproveVo.amount) {
      reqApproveVo.amount = await this.contract.methods.totalSupply().call()
    }
    this.amount = reqApproveVo.amount + ''

    let gasAmount = '80000'
    try {
      gasAmount = await this.contract.methods
        .approve(this.contractAddress, this.amount)
        .estimateGas({
          from: this.account,
        });

    } catch (error) {
      setTimeout(() => {
        this.errorCallback(error)
      }, 500);
      return
    }

    let json: any = {
      from: address,
      // gas: gasAmount
    }
    if (reqApproveVo.gasPrice) {
      json.gasPrice = reqApproveVo.gasPrice
    }
    this.contract.methods.approve(this.contractAddress, this.amount)
      .send(json)
      .on('error', (error: any) => {
        this.errorCallback(error)
      })
      .on('transactionHash', (transactionHash: any) => {
        this.transactionHashCallback(transactionHash)
      })
      .on('receipt', (receipt: any) => {
        this.receiptCallback(receipt)
        this.getSuccess()
      })
  }
  on(events: string, callback: Function) {
    if (events === 'error') {
      this.errorCallback = callback
    } else if (events === 'transactionHash') {
      this.transactionHashCallback = callback
    } else if (events === 'receipt') {
      this.receiptCallback = callback
    } else if (events === 'success') {
      this.successCallback = callback
    }
    return this
  }
  async getSuccess() {
    const balance = await this.contract.methods.allowance(this.account, this.contractAddress).call();
    // const decimals = await this.contract.methods.decimals().call()
    // Number(formatUnits(balance, decimals))
    this.key++
    if (this.key > 20) return
    if (balance >= this.amount) {
      this.successCallback(balance)
    } else {
      setTimeout(() => {
        this.getSuccess()
      }, 2000);
    }
  }
}