import React,{Component} from 'react'
import { Layout,PageHeader,Table,Divider,Spin,Popconfirm, message} from 'antd';
import './update.less'

const {Content } = Layout;
class Food extends Component{
  constructor(){
    super()
    this.state={
      dataSource:[],
      current:0,
      total:0,
      pageSize:3,
      loading:false
    }
  }
  columns = [
    {
      title: '书名',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: '销量',
      dataIndex: 'sales',
      key: 'sales',
    },
    {
      title: '库存',
      dataIndex: 'inve',
      key: 'inve',
    },
    {
      title: '简介',
      dataIndex: 'desc',
      key: 'desc',
    },
    {
      title: '封面',
      dataIndex: 'img',
      key: 'img',
      render(data){
        return(
          <img height='80' src='https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1568807560295&di=78031f4026abbe737cff622d2ea84d23&imgtype=0&src=http%3A%2F%2Fbook.img.ireader.com%2Fgroup6%2FM00%2FC9%2F29%2FCmQUNliwAvqEd43OAAAAAEKQN1s737631726.jpg%3Fv%3DO54Z6g-L'/>
        )
      }
    },
    {
      title: '类别',
      dataIndex: 'kind',
      key: 'kind',
    },
    {
      title: '原价',
      dataIndex: 'oldprice',
      key: 'oldprice',
    },
    {
      title: '现价',
      dataIndex: 'nowprice',
      key: 'nowprice',
    },
    {
      title: '操作',
      key: 'action',
      render: (text, record) => (
        <span>
            <a>更新</a>
          
          
          <Divider type="vertical" />
          
          <Popconfirm
            title="你确定要删除这条信息吗?"
            onConfirm={this.confirmDel.bind(this,record._id)}
            // onCancel={cancel}
            okText="Yes"
            cancelText="No"
            placement="bottomRight"
          >
            <a>删除</a>
          </Popconfirm>
          
        </span>
      ),
    },
  ];
  confirmDel=(id)=>{
    let {page,pageSize}=this.state
    this.$axios.post('/tractor/admin/books/del',{_id:id})
    .then((data)=>{
      if(data.data.err==0){
        message.success('删除成功')
        this.initData(page,pageSize)
      }else{
        message.error('删除失败请重试')
      }
    })
    console.log(id)
  }
  initData=(page,pageSize)=>{
    this.$axios.post('/tractor/admin/books/show',{page:page,pageSize:pageSize})
    .then((data)=>{
      if(data.data.err == 0){
        this.setState({dataSource:data.data.list,total:data.data.total,loading:false})
      }
    })
    .catch((data)=>{
      console.log('请求失败')
    })
  }
  componentDidMount(){
    this.initData()
  }
  changePage=(page,pageSize)=>{
    this.initData(page,this.state.pageSize)
    this.setState({current:page})
  }
  render(){
    let {total,pageSize,loading} = this.state
    return(
        <Layout className='books'>
          <PageHeader onBack={() => null} title="Title" subTitle="This is a subtitle" />
          <Content className='books-content'>
            <Spin tip="Loading..." spinning={loading}>
            <Table 
              columns={this.columns} 
              dataSource={this.state.dataSource}
              scroll={{x:1000}} 
              className='table'
              pagination={
                {
                  pageSize:pageSize,
                  current:this.state.current,
                  total:total,
                  onChange:this.changePage
                }
              }
            />
            </Spin>
          </Content>
        </Layout>
    )
  }
}
export default  Food