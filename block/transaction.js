class Transaction {
    constructor(from, to, value, nonce, signature) {
        this.from = from;
        this.to = to;
        this.value = value;
        this.nonce = nonce;
        this.signature = signature;
    }

    getString() {
        return this.from + this.to + this.value + this.nonce;
    }
}

module.exports = Transaction;