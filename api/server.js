const express = require('express')
const app = express()
const mongodb = require('./db/connect') 
const path=require('path')


const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const Banner = require('./router/admin/bannerRouter')
const Uploarequ=require('./router/admin/uploadBooks')
app.use('/admin/banner',Banner)
app.use('/admin/banneradd',Uploarequ)
app.use('/public',express.static(path.join(__dirname,'/www')))


app.listen(8080,()=>{
    console.log('server start')
})
//http://localhost:3000/admin/banner/add