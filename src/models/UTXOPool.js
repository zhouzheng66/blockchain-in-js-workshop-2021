import UTXO from './UTXO.js'
import Transaction from './Transaction.js';

class UTXOPool {
    constructor(utxos = {}) {
        this.utxos = utxos
    }

    // 添加交易函数
    /**
     * 将交易的信息更新至 UTXOPool 中
     */
    addUTXO(utxo) {
        // 将新的交易添加进UTXO池中并更新余额

        if (this.utxos[utxo.publicKey] != null) {
            this.utxos[utxo.publicKey] = { amount: this.utxos[utxo.publicKey].amount + utxo.amount };
        } else {
            this.utxos[utxo.publicKey] = { amount: utxo.amount };
        }
    }

    // 将当前 UXTO 的副本克隆
    clone() {
            return this.utxos
        }
        // 验证hash的算法
        // 返回一个bool值
    isValidTransaction(miner, num) {

        return this.utxos[miner].amount > num

    }

    // 处理交易的方法
    handleTransaction(tra) {
        // 首先构建一个UTXO
        if (this.isValidTransaction(tra.miner, tra.num)) {
            this.addUTXO(new UTXO(tra.receiverPubKey, tra.num))
            this.utxos[tra.miner] = { amount: this.utxos[tra.miner].amount - tra.num }
        }
    }
}

export default UTXOPool