const Trie = require('./trie');
const sha256 = require('sha256');
const randomBytes = require('crypto').randomBytes;
const Transaction = require('./transaction');

class Blockchain {
    constructor() {
        this.trie = [];
        this.trie.push(new Trie(0));
        this.preHash = '';
        this.nonce = {};
    }

    addTransaction(transaction) {
        let tot = 0;
        for (let i = 0; i < this.trie.length; i++) {
            tot += this.trie[i].getBalance(transaction.from);
        }
        if (tot < 0) {
            console.log('[Error] Can not add this transaction !');
            return;
        }
        if (this.trie[this.trie.length - 1].transactions.length == 10) {
            const stringToHash = this.preHash + this.trie[this.trie.length - 1].getString();
            this.preHash = sha256(stringToHash);
            this.trie.push(new Trie(this.trie.length));
            console.log('[Trie] new trie created');
        }
        this.trie[this.trie.length - 1].addNewTransaction(transaction);
    }

    getLast() {
        return this.trie[this.trie.length - 1];
    }

    getTransactions(address) {
        const ans = [];
        for (let i = 0; i < this.trie.length; i++) {
            for (let j = 0; j < this.trie[i].transactions.length; j++) {
                if (this.trie[i].transactions[j].from == address ||
                    this.trie[i].transactions[j].to == address) {
                        ans.push(this.trie[i].transactions[j]);
                    }
            }
        }
        return ans;
    }

    getBalance(address) {
        let ans = 0;
        for (let i = 0; i < this.trie.length; i++) {
            ans += this.trie[i].getBalance(address);
        }
        return ans;
    }

    createTx(from, to, value) {
        if (this.nonce[from] == null) {
            this.nonce[from] = 0;
        }
        this.addTransaction(new Transaction(
            from,
            to,
            value,
            this.nonce[from]++,
            randomBytes(32).toString('hex')
        ))
    }
}

module.exports = Blockchain;