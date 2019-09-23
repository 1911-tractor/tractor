const express = require('express')
const router = express.Router()
const userModel = require('../../db/model/userModel')


router.post('/login',(req,res)=>{
    let {us,ps} =req.body
    console.log(us,ps)
    userModel.find({username:us})
    .then((data)=>{
        
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