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