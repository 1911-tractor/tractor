import React,{Component} from 'react'
import {Card,Table,Button,Popconfirm,message} from 'antd'
class Banner extends Component{
  constructor(){
    super()
    this.state={
      dataSource:[],
      // page:1,
      // pageSize:3,
      // total:0,
      // loading:true,
      // updateShow:false, //修改模态框额显示
      // record:{}  //要修改的数据
      
    }
  }
 columns=[
   {
    title:'图片',
    dataIndex:'img',
    key:'img',
    render(data){
      let url="http://localhost:8080"
      console.log('图片渲染',data)
      return(<img width='80'height='80' src={`http://localhost:8080${data}`} alt=''/>)
    }
   },
  //  {
  //   title:'编号',
  //   dataIndex:'id',
  //   key:'2q'
  //  },
   {
    title:'操作',
    dataIndex:'action',
    key:'action',
    render:(txt,record)=>{
      return(
        <div>
        <Button type='primary' size='small'>修改</Button>
        <Popconfirm
              title='你确定要删除嘛？'
              onConfirm={this.confirmDel.bind(this,record._id)}
            >
              <Button type='danger' size='small'>删除</Button>
            </Popconfirm>
        </div>
      )
    }
   }
 ]
 confirmDel=(id)=>{
  console.log(id)
  let {page,pageSize} =this.state
  this.$axios.get('/tractor/admin/banner/del?_id='+id)
  .then((data)=>{
    if(data.err==0){
      message.success('删除失败')
     
    }else{
      message.error('删除ok')
      this.initData(page,pageSize)
    }
  })
 }

 initData=(page,pageSize)=>{
   this.$axios.get('/tractor/admin/banner/show',{page,pageSize})
   .then((data)=>{
     console.log(data)
     if(data.data.err == 0){
       this.setState({dataSource:data.data.list})
       console.log(this.state.dataSource)
     }

   })
 }
 componentDidMount(){
 console.log('guaz')
 let {page,pageSize} = this.state
  this.initData(page,pageSize)
}
 
 bwzsubmit=()=>{
   let file= this.refs.file.files[0]
  console.log('图片信息',file)
   let formdata= new FormData()
   formdata.append('img',file)
   this.$axios.post('/tractor/admin/banneradd/upload',formdata)
   .then((data)=>{
    //res.send({err:0,msg:'添加ok'})
    console.log('图片上传',data)
    if(data.data.err==0){
      this.setState({img:data.data.imgpath})
      console.log('111',this.state.img)
      let {img}=this.state
      console.log(img)
      this.$axios.get('/tractor/admin/banner/add?img='+img)
      .then((data)=>{
        let {page,pageSize} = this.state
        this.initData(page,pageSize)
        //res.send({err:0,msg:'添加ok'})
        console.log('上去了',data)
      })
     }

   })
  }
  render(){
    return(
       <Card className='banner-'>
         <Table dataSource={this.state.dataSource} columns={this.columns} ></Table>   
         <span>缩略图:</span><input type="file" ref='file' />  
         <Button type='primay' onClick={this.bwzsubmit}>ok</Button>  
         {/* <Pagination simple defaultCurrent={1} total={total} pageSize={pageSize} onChange={this.pageChange} />   */}
       </Card>
   
    )
  }
}
export default  Banner