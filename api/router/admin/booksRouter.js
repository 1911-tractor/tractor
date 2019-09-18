const express = require('express')
const router = express.Router()
const booksModel = require('../../db/model/bookModel')

router.get('/test',(req,res)=>{
    res.send('ok')
})

//图书的展示
router.post('/show',(req,res)=>{
    let {type,page,pageSize} = req.body
    let total = 0;
    let typeSearch={}
    if(type){
        typeSearch.type = type;
    }
    booksModel.find(typeSearch)
    .then((data)=>{
        total = data.length;
        return booksModel.find(typeSearch).skip((page-1)*pageSize).limit(Number(pageSize)).sort({price:1})
    })
    .then((data)=>{
        res.send({err:0,msg:'查询成功',list:data,total})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'查询失败'})
    })
})

//图书的增加
router.post('/add',(req,res)=>{
    //接收前端数据
    let {name,sales,inve,desc,img,kind,oldprice,nowprice} = req.body
    //处理数据
    booksModel.insertMany({name,sales,inve,desc,img,kind,oldprice,nowprice})
    .then((data)=>{
        if(data.length>0){
            res.send({err:0,msg:'添加成功'})
        }else{
            res.send({err:-1,msg:'插入失败'})
        }   
    })
    .catch((err)=>{
        res.send({err:-880,msg:'内部错误请重试'})
    })
})

//图书的删除
router.post('/del',(req,res)=>{
    let {_id}=req.body
    booksModel.deleteOne({_id:_id})
    .then((data)=>{
        console.log(data)
        res.send({err:0,msg:'删除成功'})
    })
    .catch((err)=>{
        console.log('删除失败')
    })
})
//如果是批量删除的话，我需要根据点击事件来获取一个数组，这个数组里存放的都是传入的对象，用deleteMany({_id:{$in:数组名}})
router.post('delMany',(req,res)=>{
    let items=Object.values(req.body)
    booksModel.deleteMany({$_id:{$in:items}})
    .then((data)=>{
        console.log(data)
        res.send({err:0,msg:'批量删除成功'})
    })
    .catch((err)=>{
        res.send({err:-1,mgs:'删除失败，请重试'})
    })
})

//图书的更新
router.post('/update',(req,res)=>{
    let {_id,name,sales,inve,desc,img,kind,oldprice,nowprice}=req.body
    booksModel.updateOne({_id:_id},{name,sales,inve,desc,img,kind,oldprice,nowprice})
    .then((data)=>{
        res.send({err:0,msg:'修改成功'})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'修改失败'})
    })
})

//通过关键字进行查询
router.post('/findByKw',(req,res)=>{
    let {kw} = req.body;
    let reg = new RegExp(kw)
    booksModel.find({$or:[{name:{$regex:reg}},{desc:{$regex:reg}}]})
    .then((data)=>{
        res.send({err:0,msg:'查询成功',list:data})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'查询失败'})
    })
})

//通过id获取菜品信息
router.post('/findByKind',(req,res)=>{
    let {kind} = req.body;
    booksModel.find({kind:kind})
    .then((data)=>{
        res.send({err:0,msg:'查询成功',list:data})
    })
    .catch((err)=>{
        res.send({err:-1,msg:'查询失败'})
    })
})

module.exports = router