const express = require('express')
const app = express()
const mongodb = require('./db/connect')


const bodyParser= require('body-parser')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

const AdminBook = require('./router/admin/booksRouter')
app.use('/admin/books',AdminBook)

app.listen(8080,()=>{
    console.log('server start')
})