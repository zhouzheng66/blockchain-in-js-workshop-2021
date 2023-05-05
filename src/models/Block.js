import sha256 from 'crypto-js/sha256.js'
class Block {
    // 1. 完成构造函数及其参数

    /* 构造函数需要包含
        所属的区块链
        前一个区块的Hash
        索引
        当前区块的Hash
    */
    constructor(blockchain, previousHash, index, hash) {
        this.blockchain = blockchain;
        this.previousHash = previousHash
        this.index = index
        this.hash = hash
    }
    getPreviousBlock() {
            return this.blockchain.blocks[this.previousHash]
        }
        /**
         * 计算区块Hash的方法
         * @returns 区块的Hash值
         */
    calculateHash() {
        return sha256(
            this.previousHash +
            this.height +
            this.data +
            this.timestamp +
            this.blockchain.name,
        ).toString()
    }

}

export default Block