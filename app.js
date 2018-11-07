const express = require('express');
// var mongoose = require('mongoose');
const app = express();
const Transaction = require('./database/model/transaction');
const bodyParser = require('body-parser');
app.use(bodyParser.json()); // support json encoded bodies
app.use(bodyParser.urlencoded({ extended: true })); // support encoded bodies
// //Thiết lập một kết nối mongoose mặc định
// var mongoDB = 'mongodb://localhost:27017/tangle';
// mongoose.connect(mongoDB);
// //Ép Mongoose sử dụng thư viện promise toàn cục
// mongoose.Promise = global.Promise;
// //Lấy kết nối mặc định
// var db = mongoose.connection;

let Blockchain = require('./block/blockchain');
chain = new Blockchain();

// //Ràng buộc kết nối với sự kiện lỗi (để lấy ra thông báo khi có lỗi)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));

app.get('/getBalance', (req, res) => {
    const address = req.query.address;
    const tmp = chain.getBalance(address);
    res.send(tmp + '');
})

app.get('/getTransactions', (req, res) => {
    const address = req.query.address;
    const tmp = chain.getTransactions(address);
    res.send(tmp);
})

app.post('/sendTransaction', function(req, res) {
    const from = req.body.from;
    const to = req.body.to;
    const value = req.body.value;
    chain.createTx(from, to, value);
    
});

app.listen(3000);

