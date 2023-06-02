import sha256 from 'crypto-js/sha256.js'
import { min } from 'ramda'


class Transaction {
    constructor(miner, receiverPubKey, num) {
            this.miner = miner
            this.receiverPubKey = receiverPubKey
            this.num = num
            this._setHash()
        }
        // 更新交易 hash
    _setHash() {
        this.hash = this._calculateHash();
    }

    // 计算交易 hash 的摘要函数
    _calculateHash() {
        return sha256(this.receiverPubKey + this.num).toString()

    }
}

export default Transaction