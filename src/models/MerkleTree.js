import { createHash } from 'crypto';

class MerkleTree {
    // 构造函数，输入一个data 是一个数组
    constructor(data) {
            this.leaves = data.map((leafData) => this.hashLeaf(leafData));
            this.tree = this.buildTree(this.leaves);
        }
        // 计算data的Hash的方法
    hashLeaf(leafData) {
        return createHash('sha256').update(leafData).digest('hex');
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

// 示例用法
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