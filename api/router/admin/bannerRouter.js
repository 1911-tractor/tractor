const express = require('express')
const router = express.Router()
const bannerModel = require('../../db/model/bannerModel ')

router.get('/test',(req,res)=>{
    res.send('test ok')
})

//图书的增加
router.get('/add',(req,res)=>{ 
    //接收前端数据
    
    let {img} = req.query
    //处理数据 
    bannerModel.insertMany({img})
    .then((data)=>{
        if(data.length>0){
            res.send({err:0,msg:'添加成功'})
        }else{
            res.send({err:-1,msg:'插入失败'})
        } 
    })
    .catch((err)=>{
        res.send({err:-880,msg:'内部错误请重试',err})
    })
})
router.get('/show',(req,res)=>{
    let {type,page,pageSize} = req.query
    let total = 0;
    let typeSearch={}
    if(type){
        typeSearch.type = type;
    }
    bannerModel.find(typeSearch)
    .then((data)=>{
        total = data.length;
        return bannerModel.find(typeSearch).skip((page-1)*pageSize).limit(Number(pageSize)).sort({price:1})
    })
    .then((data)=>{
        res.send({err:0,msg:'查询成功',list:data,total})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'查询失败'})
    })
})


//图书的删除
router.get('/del',(req,res)=>{
    let {_id}=req.query
    bannerModel.deleteOne({_id:_id})
    .then((data)=>{
        console.log(data)
        res.send({err:0,msg:'删除成功'})
    })
    .catch((err)=>{
        console.log('删除失败')
    })
})
//如果是批量删除的话，我需要根据点击事件来获取一个数组，这个数组里存放的都是传入的对象，用deleteMany({_id:{$in:数组名}})
// router.post('del',(req,res)=>{
//     let items=Object.values(req.body)
//     bannerModel.deleteMany({$_id:{$in:items}})
//     .then((data)=>{
//         console.log(data)
//         res.send({err:0,msg:'批量删除成功'})
//     })
//     .catch((err)=>{
//         res.send({err:-1,mgs:'删除失败，请重试'})
//     })
// })


module.exports=router