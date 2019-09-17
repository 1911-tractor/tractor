const express = require('express')
const app = express()
const mongodb = require('./db/connect')

app.listen(8080,()=>{
    console.log('server start')
})