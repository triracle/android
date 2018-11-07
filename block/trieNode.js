const Transaction = require('./transaction');

class trieNode {
    constructor(p) {
        this.index = p;
        this.nxtNode = [];
        this.balance = [];
        for (let i = 0; i < 36; i++) this.nxtNode.push(-1);
    }

    addNode(a, b) {
        if (this.nxtNode[a] == -1) this.nxtNode[a] = b;
    }

    getNxtNode(a) {
        return this.nxtNode[a];
    }

    addBalance(transaction) {
        this.balance.push(new Transaction(
            transaction.from,
            transaction.to,
            transaction.value,
            transaction.nonce,
            transaction.signature
        ))
    }
}

module.exports = trieNode;