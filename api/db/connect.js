var mongoose = require('mongoose');

mongoose.connect('mongodb://10.9.22.206:27017/tractor');

var db = mongoose.connection;
db.on('error',()=>{
    console.log('数据库连接失败')
})
db.once('open',()=>{
    console.log('数据库连接成功')
})