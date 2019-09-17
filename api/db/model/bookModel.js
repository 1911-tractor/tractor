const mongoose = require('mongoose')
const bookSchema = mongoose.Schema({
    name:{type:String,required:true},
    sales:{type:Number,required:true},
    inve:{type:Number,required:true},
    desc:{type:String,required:true},
    img:{type:String,required:true},
    kind:{type:String,required:true},
    oldprice:{type:String,required:true},
    nowprice:{type:String,required:true}
})
const booksModel = mongoose.model('book',bookSchema)
module.exports = booksModel