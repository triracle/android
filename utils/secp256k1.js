const secp256k1 = require('secp256k1');
const randomBytes = require('crypto').randomBytes;
const Transaction = require('../block/transaction.js');
const sha256 = require('sha256');

function test() {
    let privKey
    do {
        privKey = randomBytes(32);
    } while (!secp256k1.privateKeyVerify(privKey));
    const pubKey = secp256k1.publicKeyCreate(privKey);
    console.log(privKey.toString('hex') + ' ' + pubKey.toString('hex'))
    let transaction = new Transaction(1, 3, 'abc', 'xyz', 3, 3, 'abc');
    let hash = sha256(transaction.getString());
    let bufferHash = Buffer.from(hash, 'hex');
    console.log(bufferHash.length);
    const sigObj = secp256k1.sign(bufferHash, privKey);
    const tmp = sigObj.signature.toString('hex');
    const dm = Buffer.from(tmp);
    console.log(dm);
    // console.log(secp256k1.verify(Buffer.from(hash), sigObj.signature, pubKey));
}

test();