import sha256 from 'crypto-js/sha256.js'
import { min } from 'ramda'


class Transaction {
    constructor(miner, receiverPubKey, num, fee) {

            this.miner = miner
            this.receiverPubKey = receiverPubKey
            this.num = num
            this.fee = fee
            this._setHash()


        }
        // 更新交易 hash
    _setHash() {
            this.hash = this._calculateHash();

        }
        // 计算手续费的函数
    _setCharge(minner) {
        // 添加这个矿工节点
        this.minner = minner
            //添加手续费

    }

    // 计算交易 hash 的摘要函数
    _calculateHash() {

        return sha256(this.receiverPubKey + this.num + this.fee + this.miner).toString()


    }
}

export default Transaction