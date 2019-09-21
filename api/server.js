const express = require('express')
const mongodb = require('./db/connect')

const path = require('path')


const app = express()

const bodyParser = require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


//登录
const AdminUser = require('./router/admin/userRouter')
app.use('/admin/user',AdminUser)

const AdminBook = require('./router/admin/book/booksRouter')
app.use('/admin/books',AdminBook)


app.listen(8080,()=>{
    console.log('server start')
})