const express = require('express')
const mongodb = require('./db/connect')
const path = require('path')
const app = express()
const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
const AdminBook = require('./router/admin/book/booksRouter')
const AdminUser = require('./router/admin/user/userRouter')
const AdminLogin = require('./router/admin/loginRouter')

//图书管理路由
app.use('/admin/books',AdminBook)
//用户管理路由
app.use('/admin/user',AdminUser)
//登录路由
app.use('/admin/login',AdminLogin)


app.listen(8080,()=>{
    console.log('server start')
})