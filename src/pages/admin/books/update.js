import React,{Component} from 'react'
import { Layout,PageHeader,Table,Divider,Spin,Popconfirm,Button, Modal, Form, Input, Radio,InputNumber,Upload, message,Icon,Select} from 'antd';
import './update.less'

const {Content } = Layout;

const CollectionCreateForm = Form.create({ name: 'form_in_modal' })(
  // eslint-disable-next-line
  class extends React.Component {
    constructor(){
      super()
      this.state={
        imageUrl:''
      }
    }
    render() {
      const { visible, onCancel, onCreate, form } = this.props;
      const { getFieldDecorator } = form;
      const { TextArea } = Input;
      const { Option } = Select;
      const { imageUrl } = this.state;
      const uploadButton = (
        <div>
          <Icon type={this.state.picloading ? 'loading' : 'plus'} />
          <div className="ant-upload-text">Upload</div>
        </div>
      );
      return (
        <Modal
          visible={visible}
          title="Create a new collection"
          okText="Create"
          onCancel={onCancel}
          onOk={onCreate}
        >
          <Form layout="vertical">
            <Form.Item label="书名">
            {getFieldDecorator('name', {
                                    rules: [
                                    {
                                        required: true,
                                        message: '请输入书名',
                                    },
                                    ],
            })(<Input />)}
            </Form.Item>
            <Form.Item label="销量">
            {getFieldDecorator('sales', {
                rules: [
                {
                    required: true,
                    message: '请输入销量',
                },
                ],
            })(<InputNumber min={1} max={10000} defaultValue={3} />)}
            </Form.Item>
            <Form.Item label="库存">
            {getFieldDecorator('inve', {
                rules: [
                {
                    required: true,
                    message: '请输入库存数量',
                },
                ],
            })(<InputNumber min={1} defaultValue={3} />)}
            </Form.Item>
            <Form.Item label="描述">
            {getFieldDecorator('desc', {
                rules: [
                {
                    required: true,
                    message: '请输入描述',
                },
                ],
            })(<TextArea rows={3} />)}
            </Form.Item>
            <Form.Item label="封面">
            {getFieldDecorator('img', {
                rules: [
                {
                    required: true,
                    message: '请插入封面',
                },
                ],
            })(<Upload
              name="avatar"
              listType="picture-card"
              className="avatar-uploader"
              action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
              onChange={this.handleChange}
            >
              {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
            </Upload>)}
            </Form.Item>
            <Form.Item label="分类">
            {getFieldDecorator('kind', {
                rules: [
                {
                    required: true,
                    message: '请选择分类',
                },
                ],
            })(<Select
                showSearch
                style={{ width: 200 }}
                placeholder="选择一个种类"
                optionFilterProp="children"
                
              >
                <Option value="外国名著">外国名著</Option>
                <Option value="中国名著">中国名著</Option>
                <Option value="科幻小说">科幻小说</Option>
                <Option value="推理小说">推理小说</Option>
              </Select>)}
            </Form.Item>
            <Form.Item label="原价">
            {getFieldDecorator('oldprice', {
                rules: [
                {
                    required: false,
                    message: '请输入书名',
                },
                ],
            })(<InputNumber/>)}
            </Form.Item>
            <Form.Item label="现价">
            {getFieldDecorator('nowprice', {
                rules: [
                {
                    required: true,
                    message: '请输入现价',
                },
                ],
            })(<InputNumber/>)}
            </Form.Item>
          </Form>
        </Modal>
      );
    }
  },
);

class Food extends Component{
  constructor(){
    super()
    this.state={
      dataSource:[],
      current:0,
      total:0,
      pageSize:4,
      loading:true,
      visible: false,
      confirmLoading: false,
    }
  }
  columns = [
    {
      title: '书名',
      dataIndex: 'name',
      key: 'name',
      width:'150px',
    },
    {
      title: '销量',
      dataIndex: 'sales',
      key: 'sales',
      width:'70px'
    },
    {
      title: '库存',
      dataIndex: 'inve',
      key: 'inve',
      width:'70px'
    },
    {
      title: '简介',
      dataIndex: 'desc',
      key: 'desc',
      width:'300px'
    },
    {
      title: '封面',
      dataIndex: 'img',
      key: 'img',
      render(data){
        return(
          <img height='80' src={data}/>
        )
      },
      width:'150px'
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
            <a onClick={this.showModal} >更新</a>
            <CollectionCreateForm 
              //父子组件之间传递表单数据
                wrappedComponentRef={this.saveFormRef}
                visible={this.state.visible}
                onCancel={this.handleCancel}
                onCreate={this.handleCreate}
            />

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

  //删除图书信息
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

  //修改图书信息
  showModal = () => {
    this.setState({
      visible: true,
    });
  };
  handleOk = () => {
    this.setState({
      ModalText: 'The modal will be closed after two seconds',
      confirmLoading: true,
    });
    setTimeout(() => {
        this.setState({
          visible: false,
          confirmLoading: false,
        });
      }, 2000);
    };
  handleCancel = () => {
    console.log('Clicked cancel button');
    this.setState({
      visible: false,
    });
  };

  //获得表单数据，并且打印出来
  handleCreate = () => {
    const form = this.formRef.props.form;
    console.log(form)
    form.validateFields((err, values) => {
      if (err) {
        return;
      }else{
        console.log('Received values of form: ', values);
        form.resetFields();
        this.setState({ visible: false });
      }
    });
  };



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
    const { visible, confirmLoading } = this.state;
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

          {/* 修改信息模态框 */}
          
        </Layout>
    )
  }
}
export default  Food