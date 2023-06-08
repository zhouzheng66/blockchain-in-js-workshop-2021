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

## 加密货币理论作业在实践作业的后面

## 加密货币理论
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

[![lesson1-1.png](https://i.postimg.cc/8kmbqrL9/lesson1-1.png)](https://postimg.cc/qggnKqbx)


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
```
// Block.js中更新nonce的函数
setNonce(nonce) {
            this.nonce = nonce
        }
isValid() {
       
        const str = "0".repeat(DIFFICULTY)
        this._setHash()
        return this.hash.startsWith(str)
    }
     _setHash() {
        this.hash = sha256(this.nonce + this.height + this.previousHash).toString()
    }
```

### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图

> 将截图上传至网盘，放入链接即可
[![lesson2.png](https://i.postimg.cc/zXRNvGnK/lesson2.png)](https://postimg.cc/BXskws7n)

![https://postimg.cc/BXskws7n](链接)


### 主观与讨论题内容



---


## 第三课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图
```
// 给每个Block 添加UTXO属性和coinbaseBeneficiary属性
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
```
``` 
export default class UTXO {
    constructor(pubKey, amount) {
        this.pubKey = pubKey
        this.amount = amount
    }
}
```
```
import UTXO from './UTXO.js'

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

        if (this.utxos[utxo.pubKey] != null) {
            this.utxos[utxo.pubKey] = { amount: this.utxos[utxo.pubKey].amount + utxo.amount };
        } else {
            this.utxos[utxo.pubKey] = { amount: utxo.amount };
        }
    }

    // 将当前 UXTO 的副本克隆
    clone() {
        return this.utxos
    }
}

export default UTXOPool
```

> 将截图上传至网盘，放入链接即可

[![lesson3.png](https://i.postimg.cc/yNZFx9Lc/lesson3.png)](https://postimg.cc/sB3B0Bdg)


### 主观与讨论题内容



---




## 第四课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图
```
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
```
```
// UTXOpool中的处理交易方法
 handleTransaction(tra) {
        // 首先构建一个UTXO
        if (this.isValidTransaction(tra.miner, tra.num)) {
            this.addUTXO(new UTXO(tra.receiverPubKey, tra.num))
            this.utxos[tra.miner] = { amount: this.utxos[tra.miner].amount - tra.num }
        }
    }
  // 验证交易的方法
isValidTransaction(miner, num) {
   console.log(this.utxos)
   return this.utxos[miner].amount > num
}
```

> 将截图上传至网盘，放入链接即可

[![lesson4.png](https://i.postimg.cc/nrpc8sRv/lesson4.png)](https://postimg.cc/PpVkYqkx)


### 主观与讨论题内容



---




## 第五课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图
该部分整合了默克尔树 merkleTree.js
```
import { createHash } from 'crypto';
import sha256 from 'crypto-js/sha256.js'

class MerkleTree {
    // 构造函数，输入一个data 是一个数组
    constructor(data) {
            this.leaves = data.map((leafData) => this.hashLeaf(leafData));
            this.tree = this.buildTree(this.leaves);
        }
        // 计算data的Hash的方法
    hashLeaf(leafData) {
        return sha256(leafData).toString
    }

    buildTree(leaves) {
            if (leaves.length === 1) {
                return leaves;
            }

            const parents = [];
            for (let i = 0; i < leaves.length; i += 2) {
                const left = leaves[i];
                const right = i + 1 < leaves.length ? leaves[i + 1] : '';
                const parent = this.hashNodes(left, right);
                parents.push(parent);
            }

            return this.buildTree(parents);
        }
        // 计算左右两个叶子节点的hash值的方法
    hashNodes(left, right) {
            return createHash('sha256').update(left + right).digest('hex');
        }
        // 返回默克尔树的根
    getRoot() {
        return this.tree[0];
    }

    getProof(index) {
        const proof = [];
        let idx = index;

        for (let i = 0; i < this.tree.length - 1; i++) {
            const siblingIdx = idx % 2 === 0 ? idx + 1 : idx - 1;
            const sibling = this.tree[siblingIdx];
            proof.push(sibling);

            idx = Math.floor(idx / 2);
        }

        return proof;
    }

    verify(root, data, proof) {
        let hash = this.hashLeaf(data);

        for (const sibling of proof) {
            const left = sibling < hash ? sibling : hash;
            const right = sibling < hash ? hash : sibling;
            hash = this.hashNodes(left, right);
        }

        return root === hash;
    }

    addNode(data) {
        const leaf = this.hashLeaf(data);
        this.leaves.push(leaf);
        this.rebuildTree();
    }

    removeNode(data) {
        const leaf = this.hashLeaf(data);
        const index = this.leaves.indexOf(leaf);
        if (index > -1) {
            this.leaves.splice(index, 1);
            this.rebuildTree();
        }
    }

    rebuildTree() {
        this.tree = this.buildTree(this.leaves);
    }
}

export default MerkleTree
// 示例用法
// const data = ['a', 'b', 'c', 'd'];
// const merkleTree = new MerkleTree(data);
// const root = merkleTree.getRoot();
// console.log('Merkle Tree Root:', root);

// // 添加节点
// merkleTree.addNode('e');
// const newRoot = merkleTree.getRoot();
// console.log('Updated Merkle Tree Root:', newRoot);

// // 删除节点
// merkleTree.removeNode('c');
// const finalRoot = merkleTree.getRoot();
// console.log('Final Merkle Tree Root:', finalRoot);
```
Block.js
```
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
    // 添加交易的函数
     addTransaction(trx) {
            this.merkleTree.addNode(trx)
            this.utxoPool.handleTransaction(trx)
        }
         // 获取交易hash combinedTransactionsHash
    combinedTransactionsHash() {
        return this.merkleTree.getRoot()
    }
```

> 将截图上传至网盘，放入链接即可

[![lesson5.png](https://i.postimg.cc/hPLNYyTQ/lesson5.png)](https://postimg.cc/w7BWykW9)


### 主观与讨论题内容



---




## 第六课代码


### 代码 commint 地址

https://github.com/CUITBlockchain/blockchain-in-js-workshop-2021/commit/25f3a0d83a9fff2b4514c5503f470df939d0c2af


### 代码截图
Transaction中更新了构造函数和加了一个_serCharge函数，设置矿工节点，更新了_calculateHash函数
```
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
```
UTXOPool中更新了isValidTranscation函数和handleTransaction函数逻辑
```
isValidTransaction(tra) {

        return this.utxos[tra.miner].amount > (tra.num + tra.fee)

    }

    // 处理交易的方法
    handleTransaction(tra) {
        // 首先构建一个UTXO
        if (this.isValidTransaction(tra)) {
            this.addUTXO(new UTXO(tra.receiverPubKey, (tra.num)))
            this.addUTXO(new UTXO(tra.minner, tra.fee))
            this.utxos[tra.miner] = { amount: this.utxos[tra.miner].amount - tra.num - tra.fee }

        }
    }
```
    在Block中更新了addTransaction函数逻辑
```
    addTransaction(trx) {
            this.merkleTree.addNode(trx)
                // 给这笔交易添加矿工
            trx._setCharge(this.coinbaseBeneficiary)

            this.utxoPool.handleTransaction(trx)
                


        }
 ```

> 将截图上传至网盘，放入链接即可

[![lesson6.png](https://i.postimg.cc/DwsH97Dg/lesson6.png)](https://postimg.cc/nXF37fnj)


### 主观与讨论题内容



---

# 加密货币理论
## merkelTree
```
import { createHash } from 'crypto';
import sha256 from 'crypto-js/sha256.js'

class MerkleTree {
    // 构造函数，输入一个data 是一个数组
    constructor(data) {
            this.leaves = data.map((leafData) => this.hashLeaf(leafData));
            this.tree = this.buildTree(this.leaves);
        }
        // 计算data的Hash的方法
    hashLeaf(leafData) {
        return sha256(leafData).toString
    }

    buildTree(leaves) {
            if (leaves.length === 1) {
                return leaves;
            }

            const parents = [];
            for (let i = 0; i < leaves.length; i += 2) {
                const left = leaves[i];
                const right = i + 1 < leaves.length ? leaves[i + 1] : '';
                const parent = this.hashNodes(left, right);
                parents.push(parent);
            }

            return this.buildTree(parents);
        }
        // 计算左右两个叶子节点的hash值的方法
    hashNodes(left, right) {
            return createHash('sha256').update(left + right).digest('hex');
        }
        // 返回默克尔树的根
    getRoot() {
        return this.tree[0];
    }

    getProof(index) {
        const proof = [];
        let idx = index;

        for (let i = 0; i < this.tree.length - 1; i++) {
            const siblingIdx = idx % 2 === 0 ? idx + 1 : idx - 1;
            const sibling = this.tree[siblingIdx];
            proof.push(sibling);

            idx = Math.floor(idx / 2);
        }

        return proof;
    }

    verify(root, data, proof) {
        let hash = this.hashLeaf(data);

        for (const sibling of proof) {
            const left = sibling < hash ? sibling : hash;
            const right = sibling < hash ? hash : sibling;
            hash = this.hashNodes(left, right);
        }

        return root === hash;
    }

    addNode(data) {
        const leaf = this.hashLeaf(data);
        this.leaves.push(leaf);
        this.rebuildTree();
    }

    removeNode(data) {
        const leaf = this.hashLeaf(data);
        const index = this.leaves.indexOf(leaf);
        if (index > -1) {
            this.leaves.splice(index, 1);
            this.rebuildTree();
        }
    }

    rebuildTree() {
        this.tree = this.buildTree(this.leaves);
    }
}

export default MerkleTree
//示例用法
const data = ['a', 'b', 'c', 'd'];
const merkleTree = new MerkleTree(data);
const root = merkleTree.getRoot();
console.log('Merkle Tree Root:', root);

// 添加节点
merkleTree.addNode('e');
const newRoot = merkleTree.getRoot();
console.log('Updated Merkle Tree Root:', newRoot);

// 删除节点
merkleTree.removeNode('c');
const finalRoot = merkleTree.getRoot();
console.log('Final Merkle Tree Root:', finalRoot);
```
### 运行截图
[![image.png](https://i.postimg.cc/Xqghc19d/image.png)](https://postimg.cc/9wrJcp8Q)

## 字典树
```
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let current = this.root;

        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!current.children[char]) {
                current.children[char] = new TrieNode();
            }
            current = current.children[char];
        }

        current.isEndOfWord = true;
    }

    search(word) {
        let current = this.root;

        for (let i = 0; i < word.length; i++) {
            const char = word[i];
            if (!current.children[char]) {
                return false;
            }
            current = current.children[char];
        }

        return current.isEndOfWord;
    }

    startsWith(prefix) {
        let current = this.root;

        for (let i = 0; i < prefix.length; i++) {
            const char = prefix[i];
            if (!current.children[char]) {
                return false;
            }
            current = current.children[char];
        }

        return true;
    }

    delete(word) {
        this.deleteRecursive(this.root, word, 0);
    }

    deleteRecursive(node, word, index) {
        if (index === word.length) {
            if (!node.isEndOfWord) {
                return false;
            }
            node.isEndOfWord = false;
            return Object.keys(node.children).length === 0;
        }

        const char = word[index];
        if (!node.children[char]) {
            return false;
        }

        const shouldDeleteCurrentNode = this.deleteRecursive(
            node.children[char],
            word,
            index + 1
        );

        if (shouldDeleteCurrentNode) {
            delete node.children[char];
            return Object.keys(node.children).length === 0;
        }

        return false;
    }
}

// 测试代码
const trie = new Trie();

trie.insert("apple");
trie.insert("banana");
trie.insert("orange");

console.log(trie.search("apple")); // 输出 true
console.log(trie.search("banana")); // 输出 true
console.log(trie.search("orange")); // 输出 true
console.log(trie.search("grape")); // 输出 false

console.log(trie.startsWith("app")); // 输出 true
console.log(trie.startsWith("ban")); // 输出 true
console.log(trie.startsWith("ora")); // 输出 true
console.log(trie.startsWith("gr")); // 输出 false

trie.delete("apple");
console.log(trie.search("apple")); // 输出 false
console.log(trie.startsWith("app")); // 输出 false
```


### 运行截图
[![image.png](https://i.postimg.cc/cJmnWQ7T/image.png)](https://postimg.cc/zLyBSHcR)

## 字典树的优缺点
字典树的优点：
高效的字符串查找：由于字典树将查询字符串拆分成单个字符，通过每个字符构造出一条路径，最终到达叶节点即可找到匹配的字符串。这种方式比传统的线性查找更加高效。
可以快速查找某个字符串的公共前缀：字典树的层级结构使得在查找某个字符串的公共前缀时，可以从根节点开始沿着相同的路径向下遍历，直到找到最后一个公共节点。这样可以有效地减少查找时间。
方便地插入和删除字符串：由于字典树的层级结构，插入和删除字符串时只需要对每个字符进行操作，而不需要移动其他节点，因此非常高效。

字典树的缺点：
消耗内存：每个节点都需要额外的存储空间来存储指向其他节点的指针，因此在大规模字符串存储时，会消耗大量的内存空间。
构建字典树时可能需要先排序：为了保证字典树能够正确构建，需要按照一定的顺序将字符串插入到字典中。如果需要对大规模数据进行处理，排序过程可能会成为瓶颈。
相比其他数据结构，查找非字符串类型的数据时效率较低：字典树主要用于字符串的存储和查找，如果需要查找其他类型的数据，则效率会比其他数据结构如哈希表、红黑树等低。
在某些情况下仍需要线性查找：当字典树较大时，查询字符串的开销也较大，可能导致查找速度变慢。此外，对于非前缀型匹配，字典树也需要进行线性查找，效率较低。
因此，字典树适用于大规模字符串存储和查找场景，但在其他情况下可能不太适用。

## 如何能够扩展和优化字典树数据结构
字典树的扩展和优化主要有以下几种方法：
压缩字典树：这种方法是将字典树中的单分支节点合并成一个节点，用一个字符串来表示该分支上的所有字符，从而减少节点的数量和深度。
三分搜索树：这种方法是将字典树中的每个节点分成三个子节点，分别存储小于、等于和大于当前字符的后续字符，从而减少空间的浪费和查找的比较次数。
双数组字典树：这种方法是将字典树中的节点和边用两个数组来表示，一个数组存储节点的基址，另一个数组存储节点的检验值，从而实现了字典树的随机访问和紧凑存储。
后缀树：这种方法是将字典树中的每个节点存储一个字符串的所有后缀，从而实现了字符串的快速匹配和查找。

## 交易状态树
```
import pkg from 'keccak256';
const { keccak256 } = pkg;
// MPT节点类
class MPTNode {
    constructor() {
        this.value = null; // 节点值（余额等）
        this.children = {}; // 子节点映射表
    }
}

// MPT树类
class MPT {
    constructor() {
        this.root = new MPTNode(); // 根节点
    }

    // 添加或更新地址的函数
    addOrUpdateAddress(address, value) {
        const key = Buffer.from(address, "hex"); // 将地址转换为Buffer类型的键
        this._addOrUpdateKey(this.root, key, value, 0);
    }

    // 内部递归函数：添加或更新键值对
    _addOrUpdateKey(node, key, value, depth) {
        if (depth === key.length) {
            // 到达键的末尾，设置节点值
            node.value = value;
            return;
        }

        const nibble = key[depth] >> 4; // 获取当前字节的高4位（nibble）
        const remainingNibble = key[depth] & 0x0f; // 获取当前字节的低4位（nibble）

        if (!node.children[nibble]) {
            node.children[nibble] = new MPTNode();
        }

        // 递归处理子节点
        this._addOrUpdateKey(
            node.children[nibble],
            key,
            value,
            depth + 1
        );

        // 如果子节点已经设置值，则删除子节点
        if (Object.keys(node.children[nibble].children).length === 0 && node.children[nibble].value === null) {
            delete node.children[nibble];
        }

        // 更新哈希值
        this._updateHash(node, remainingNibble);
    }

    // 更新节点的哈希值
    _updateHash(node, remainingNibble) {
        const childrenHashes = Object.keys(node.children)
            .sort()
            .map(key => {
                const childNode = node.children[key];
                this._updateHash(childNode, null); // 递归更新子节点的哈希值
                return keccak256(childNode.hash + key).toString("hex");
            });

        const valueHash = node.value ? keccak256(node.value).toString("hex") : "";

        if (childrenHashes.length > 0) {
            node.hash = keccak256(childrenHashes.join("") + valueHash + remainingNibble).toString("hex");
        } else {
            node.hash = valueHash;
        }
    }

    // 验证地址和余额信息是否匹配
    verifyAddress(address, value) {
        const key = Buffer.from(address, "hex");
        return this._verifyKey(this.root, key, value, 0);
    }

    // 内部递归函数：验证键值对
    _verifyKey(node, key, value, depth) {
        if (depth === key.length) {
            return node.value === value;
        }

        const nibble = key[depth] >> 4; // 获取当前字节的高4位（nibble）
        const remainingNibble = key[depth] & 0x0f; // 获取当前字节的低4位（nibble）

        if (!node.children[nibble]) {
            return false;
        }

        return this._verifyKey(
            node.children[nibble],
            key,
            value,
            depth + 1
        );
    }
}

// 示例用法
const mpt = new MPT();

// 添加地址和余额信息
mpt.addOrUpdateAddress("0x0123456789abcdef", "100");
mpt.addOrUpdateAddress("0xabcdef0123456789", "200");

// 验证地址和余额信息
console.log(mpt.verifyAddress("0x0123456789abcdef", "100")); // 输出: true
console.log(mpt.verifyAddress("0x0123456789abcdef", "200")); // 输出: false
```

### 运行截图
[![image.png](https://i.postimg.cc/wTy4BBGD/image.png)](https://postimg.cc/hfn1yKgG)

## 基于字典树，以太坊做了那些改良？
以太坊在字典树的基础上做了一些改良，主要是为了优化其性能和安全性。
首先，以太坊使用了MTP作为其状态树数据结构。与传统的字典树不同，MPT使用了哈希指针，使得它能更有效地处理大量数据。其次，以太坊将所有的账户信息存储在一个叫做“世界状态”的树中，而每个交易都会对世界状态进行更新。这样一来，就可以避免因为每个区块都需要重复计算所有交易而导致的性能问题。最后，以太坊使用了“交易收据”来更好地记录每笔交易的详细信息，包括交易费用、执行结果等，从而提高了交易的安全性和可追溯性。
总的来说，以太坊通过优化字典树的实现和引入新的技术手段，成功地解决了传统字典树在处理大量数据时存在的性能和安全问题，从而保障了其系统的稳定运行。

## MPT想要解决的核心问题是什么
MPT想要解决的核心问题是在区块链系统中高效地存储和访问大量键值对数据。
在传统的区块链系统中，每个区块都会存储大量的交易信息以及账户状态信息，这些信息通常被保存在一个名为状态树的数据结构中。然而，状态树的查询和更新操作效率较低，因为它需要遍历整个树来定位到特定的数据项，尤其是在处理大量数据时，效率更是低下。另外，由于区块链系统的不可篡改性，所有的交易记录和状态信息都需要保存在系统中，导致状态树持续增长，占用了大量的存储空间。
MPT通过使用类似于哈希表的数据结构来存储键值对数据，充分利用了哈希指针的高效性能，可以提高状态树的查询和更新效率，并且只需将更新过的节点写入磁盘，节省了存储空间和读写时间。同时，它也可以有效地防止数据被恶意篡改，保障了区块链系统的安全性和稳定性。
因此，MPT的核心问题是如何在区块链系统中高效地存储和访问大量键值对数据，从而优化系统的性能和安全性。
## 结课报告





