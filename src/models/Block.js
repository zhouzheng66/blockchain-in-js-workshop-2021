import sha256 from 'crypto-js/sha256.js'
import { min } from 'ramda';

import UTXOPool from './UTXOPool.js';
import MerkleTree from './MerkleTree.js';
import "./Transaction.js"
import Transaction from './Transaction.js';

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
        this.merkleTree = new MerkleTree([new Transaction(0, this.coinbaseBeneficiary, 12.5)])
            // this.merkleTreeRoot = this.merkleTree.getRoot()

    }
    isValid() {
        var str = "0".repeat(DIFFICULTY)
        this._setHash()
        return this.hash.startsWith(str)
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
    _setHash() {
        this.hash = sha256(this.nonce + this.previousHash + this.height + this.blockchain + this.coinbaseBeneficiary).toString()
    }

    addTransaction(trx) {
            this.merkleTree.addNode(trx)
            this.utxoPool.handleTransaction(trx)
        }
        // 获取交易hash combinedTransactionsHash
    combinedTransactionsHash() {
        return this.merkleTree.getRoot()
    }


}

export default Block