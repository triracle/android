const Node = require('./trieNode.js');
const Transaction = require('../database/model/transaction');

class Trie {
    constructor(id) {
        this.id = id;
        this.node = [];
        this.node.push(new Node(0));
        this.stringify = [];
        this.transactions = [];
        this.balance = {};
        this.stringToHash = '';
        //add them tai khoan admin
        if (id == 0) this.balance['0290bb3aedfa3f13bba42d523b5873fa40f06f026cb0989c78e93f6db296abdd3b'] = 10000;
    }

    getValue(a) {
        if ('a' <= a && a <= 'z') {
            return a.charCodeAt(0) - 'a'.charCodeAt(0) + 10;
        }
        return a.charCodeAt(0) - '0'.charCodeAt(0);
    }

    addNewTransaction(transaction) {
        if (this.balance[transaction.from] == null) {
            this.balance[transaction.from] = 0;
        }
        if (this.balance[transaction.to] == null) {
            this.balance[transaction.to] = 0;
        }
        this.balance[transaction.from] -= parseInt(transaction.value, 10);
        this.balance[transaction.to] += parseInt(transaction.value, 10);
        let currentNode = this.node[0];  // root
        for (let i = 0; i < transaction.from.length; i++) {
            const nxtValue = this.getValue(transaction.from[i]);
            if (currentNode.getNxtNode(nxtValue) == -1) {
                let newNode = new Node(this.node.length);
                currentNode.addNode(nxtValue, newNode.index);
                this.node.push(newNode);
            }
            currentNode = this.node[currentNode.getNxtNode(nxtValue)];
        }
        // add balance
        currentNode.addBalance(transaction);
        // add more transaction to array
        transaction.id = this.transactions.length;
        this.transactions.push(transaction);
    }

    dfs(currentNode) {
        if (currentNode.balance.length > 0) {
            for (let i = 0; i < currentNode.balance.length; i++) {
                this.stringToHash += currentNode.balance[i].getString();
            }
            return;
        }
        for (let i = 0; i < 36; i++) {
            const nxtValue = currentNode.getNxtNode(i);
            if (nxtValue != -1) {
                this.dfs(this.node[nxtValue]);
            }
        }
    }

    addNewTransactions(transactions) {
        for (let i = 0; i < transactions.length; i++) {
            this.addNewTransaction(transactions[i]);
        }
    }

    getBalance(address) {
        return this.balance[address];
    }

    getTransactions() {
        return this.transactions;
    }

    getString() {
        this.stringToHash += this.id;
        this.dfs(this.node[0]);
        return this.stringToHash;
    }
}

module.exports = Trie;