const express = require('express')
const router = express.Router()
const userModel = require('../../../db/model/userModel')

router.get('/test',(req,res)=>{
    res.send('ok')
})

userModel.insertMany({username:'徐兴',password:'123456',address:'318'})

module.exports = router