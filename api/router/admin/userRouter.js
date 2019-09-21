const express = require('express')
const router = express.Router()
const userModel = require('../../db/model/userModel')
//const jwt = require('jsonwebtoken')
//const secret = 'qwerqwer'

router.post('/login',(req,res)=>{
    let {us,ps} =req.body
    console.log(us,ps)
    userModel.find({username:us})
    .then((data)=>{
        // console.log(data[0])
        // console.log(data[0].password)
        // console.log(data[0].username,data[0].ps,1)
        // console.log(data[0].username===us,data[0].password===ps,2)
        if(data[0].username===us && data[0].password===ps){
          
            res.send({err:0,msg:'登录ok',username:us})
        }else{
            res.send({err:-1,msg:'账户密码错误，登陆失败'})
        }
    })
    .catch((err)=>{
        res.send({err:-998,msg:'无此用户'})
    })
    
})
module.exports = router