import sha256 from 'crypto-js/sha256.js'
import { min } from 'ramda';
import "./UTXOPool.js"
import UTXOPool from './UTXOPool.js';

export const DIFFICULTY = 2

class Block {
    // 1. 完成构造函数及其参数

    constructor(blockchain, previousHash, index, hash, miner) {
        this.blockchain = blockchain;
        this.previousHash = previousHash
        this.height = index
        this.hash = hash
            // 矿工
        this.coinbaseBeneficiary = miner
            //创建交易池
        this.utxoPool = new UTXOPool({})
    }
    isValid() {
        // var str = ""
        // for (let i = 0; i < DIFFICULTY; i++) {
        //     str = str + "0"
        // }
        var str = "0".repeat(DIFFICULTY)
        return (this.nonce + "").startsWith(str)
    }

    setNonce(nonce) {
            this.nonce = nonce
        }
        /**
         * 
         * @returns 该区块的前一个区块
         */
    getPreviousBlock() {
        if (this.height == 1) {
            return this.blockchain.genesis
        }
        return this.blockchain.blocks[this.previousHash]
    }

}

export default Block