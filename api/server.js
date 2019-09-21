const express = require('express')
const mongodb = require('./db/connect')
// const fs = require('fs')
const path = require('path')
//const jwt = require('jsonwebtoken')
//const secret = 'qwerqwer'
const app = express()
// const multer = require('multer')
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
// const AdminBook = require('./router/admin/booksRouter')
// app.use('/admin/books',AdminBook)

//登录
const AdminUser = require('./router/admin/userRouter')
app.use('/admin/user',AdminUser)

app.listen(8080,()=>{
    console.log('server start')
})