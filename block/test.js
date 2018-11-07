const Blockchain = require('./blockchain');
const Transaction = require('./transaction')
const sha256 = require('sha256');

function test() {
    let chain = new Blockchain();
    chain.addTransaction(new Transaction(
        '0290bb3aedfa3f13bba42d523b5873fa40f06f026cb0989c78e93f6db296abdd3b',
        '0202fb596f0269a37fd3bb13c755d41387c9dc9a8512a4b6112b8ba1ec97a75944',
        30,
        30,
        'bd1c93c046f249c88235801cfba88dffde6a816bcafe4096671a6a64d860d160'
    ));
    console.log(chain.getTransactions('0290bb3aedfa3f13bba42d523b5873fa40f06f026cb0989c78e93f6db296abdd3b'));
}

test();