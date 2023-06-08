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