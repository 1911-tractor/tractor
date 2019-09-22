const mongoose = require('mongoose')
const bannerSchema = mongoose.Schema({ 
    img:{type:String,required:true}, 
})
const bannerModel = mongoose.model('banners',bannerSchema)
module.exports = bannerModel