const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let TransactionSchema = new Schema({
    trieid: Number,
    id: Number,
    from: String,
    to: String,
    value: Number,
    nonce: Number,
    signature: String
})

let Transaction = mongoose.model("Transaction", TransactionSchema);

module.exports = Transaction;