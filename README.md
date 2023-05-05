# 实验报告模板

## 小组成员

- 2021131037-周正 （组长）
- 2021131047-李宁
- 2021131002-黄文迪
- 2021131045-叶瑶瑶
- 2021131034-贾伟泽
- 2021131033-康智豪


## 代码仓库链接
https://github.com/zhouzheng66/blockchain-in-js-workshop-2021.git



## 第一课代码
```
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
```
```
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
```
### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图

> 将截图上传至网盘，放入链接即可

![https://postimg.cc/gallery/D44zddK](链接)


### 主观与讨论题内容

---



## 第一课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图

> 将截图上传至网盘，放入链接即可

![](链接)


### 主观与讨论题内容


---



## 第二课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图

> 将截图上传至网盘，放入链接即可

![](链接)


### 主观与讨论题内容



---


## 第三课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图

> 将截图上传至网盘，放入链接即可

![](链接)


### 主观与讨论题内容



---




## 第四课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图

> 将截图上传至网盘，放入链接即可

![](链接)


### 主观与讨论题内容



---




## 第五课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图

> 将截图上传至网盘，放入链接即可

![](链接)


### 主观与讨论题内容



---




## 第六课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图

> 将截图上传至网盘，放入链接即可

![](图片链接放这里)


### 主观与讨论题内容



---


## 结课报告





