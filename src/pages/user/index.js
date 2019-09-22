import React,{Component} from 'react'
import { Layout,PageHeader,Table,Divider,Spin,Popconfirm} from 'antd';
import './index.less'
class User extends Component{
  constructor(){
    super()
    this.state={
      dataSource:[]
    }
  }
  initData = () =>{
      this.$axios.get('')
      .then((data)=>{
          if(data==0){
              this.setState({dataSource:data.list})
          }
      })
  }
  columns = [
    {
      title: '用户名',
      dataIndex: 'username',
      key: 'username',
    },
    {
      title: '密码',
      dataIndex: 'password',
      key: 'password',
    },
    {
      title: '地址',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: '订单',
      dataIndex: 'order',
      key: 'order',
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
            onConfirm={this.confirm.bind(this,record._id)}
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
  render(){
    return(
        <div>
            <Table dataSource={this.state.dataSource} columns={this.columns} />
        </div>
    )
  }
}
export default  User