const express = require('express')
const router = express.Router()
const multer = require('multer')
const fs = require('fs')
const path = require('path')

//图片的上传
router.post('/upload',multer().single('img'),(req,res)=>{
    let {buffer,mimetype} = req.file
    let filename = (new Date()).getTime()+parseInt(Math.random()*99999)//写一个时间戳+随机数，目的是不让文件名重复
    let extname = mimetype.split('/')[1]
    //类型判断 【gif,png,jpg,jpeg,svg】
    //大小限制只允许上传小于500k的图片
    let dir = path.join(__dirname,'../../www/images')
    let resPath = `/public/images/${filename}.${extname}`
    fs.writeFile(`${dir}/${filename}.${extname}`,buffer,(err)=>{
        console.log(err)
        if(err){
            res.send({err:-1,msg:'上传图片失败'})
        }else{
            res.send({err:0,msg:'上传图片成功',imgpath:resPath})
        }
    })
})
module.exports=router