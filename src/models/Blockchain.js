// Blockchain
import Block from "./Block.js"
class Blockchain {
    // 1. 完成构造函数及其参数
    /* 构造函数需要包含 
        - 名字
        - 创世区块
        - 存储区块的映射
    */
    constructor(name) {
            this.name = name; //区块的名字
            this.blocks = {}; //用于存储区块的映射
            this.genesis = null; //创世区块
        }
        // 2. 定义 longestChain 函数
        /* 
          返回当前链中最长的区块信息列表
        */
    longestChain() {
        let longestChain = [] //声明一个数组来存储最长链

        for (let hash in this.blocks) { //便利每一个区块，找每一个区块的前置节点加入到一个临时数组chain中
            let currentBlock = this.blocks[hash]
            let chain = [currentBlock] //初始化这个临时数组，里面有个节点是当前节点

            while (currentBlock.previousHash != "root" && currentBlock.hash != "root") { //判断当前区块如果不是创世区块，就将前一个块放入临时链
                currentBlock = currentBlock.getPreviousBlock(); //将当前块指针前移
                chain.unshift(currentBlock) //将前移过后的当前区块加入到临时链中
            }

            if (chain.length > longestChain.length) { //如果临时链的高度比最长链高，就将临时链赋值给最长链
                longestChain = chain
            }
        }

        return longestChain
    }

}



export default Blockchain