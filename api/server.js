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
const AdminBook = require('./router/admin/booksRouter')
const AdminUser = require('./router/admin/user/userRouter')
//图书管理路由
app.use('/admin/books',AdminBook)
//用户管理路由
app.use('/admin/user',AdminUser)
//登录路由
const AdminLogin = require('./router/admin/loginRouter')
app.use('/admin/login',AdminLogin)

app.listen(8080,()=>{
    console.log('server start')
})