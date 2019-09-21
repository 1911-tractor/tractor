import React,{Component} from 'react'
import { Layout,PageHeader,Spin,Form,Input,InputNumber,Upload, message, Button, Icon,Select} from 'antd';
import './add.less'

const {Content } = Layout;

function getBase64(img, callback) {
  const reader = new FileReader();
  reader.addEventListener('load', () => callback(reader.result));
  reader.readAsDataURL(img);
}

class Add extends Component{
    constructor(){
        super()
        this.state={
            loading:false,
            imageUrl:'',
            img:'',
            picloading:false
        }
    }
    handleSubmit=(e)=>{
        e.preventDefault();
        this.props.form.validateFields((err,data)=>{
            console.log(err)
            let {name,desc,kind,sales,inve,oldprice,nowprice} = data
            let {imageUrl} = this.state
            if(err){
                // 前端验证有错误
                message.error('输入信息有误请重试!',1)
              }else{
                // 前端验证ok 调用ajax 接口
                this.$axios.post('/tractor/admin/books/add',{name:name,desc:desc,sales:sales,inve:inve,img:imageUrl.file.name,kind:kind,oldprice:oldprice,nowprice:nowprice})
                .then((data)=>{
                    if(data.data.err === 0){
                       message.success('新增图书信息成功',1,()=>{
                         this.props.history.push('/admin/books/update')
                       })
                    }else{
                      message.error('更新图书信息失败')
                    }
                })
        
              }
        })
    }
    handleChange = info => {
      if (info.file.status === 'uploading') {
        this.setState({ picloading: true });
        return;
      }
      if (info.file.status === 'done') {
        // Get this url from response in real world.
        getBase64(info.file.originFileObj, imageUrl =>
          this.setState({
            imageUrl,
            picloading:true
          }),
        );
      }
    };
    render(){
        const formItemLayout = {
            labelCol: {
              xs: { span: 24 },
              sm: { span: 8 },
            },
            wrapperCol: {
              xs: { span: 24 },
              sm: { span: 16 },
            },
          };
        const { getFieldDecorator } = this.props.form;
        const { TextArea } = Input;
        const { Option } = Select;
        const { imageUrl } = this.state;
        const tailFormItemLayout = {
            wrapperCol: {
              xs: {
                span: 24,
                offset: 0,
              },
              sm: {
                span: 16,
                offset: 8,
              },
            },
          };
        const uploadButton = (
          <div>
            <Icon type={this.state.picloading ? 'loading' : 'plus'} />
            <div className="ant-upload-text">Upload</div>
          </div>
        );
        let {loading} = this.state
        return(
            <Layout  className='books'>
                <PageHeader onBack={() => null} title="商品添加" subTitle="This is a subtitle" />
                <Content className='books-content'>
                    <Spin tip="Loading..." spinning={loading}>
                        <div className='form'>
                            <Form {...formItemLayout} onSubmit={this.handleSubmit}>
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
                                <Form.Item {...tailFormItemLayout}>
                                    <Button type="primary" htmlType="submit">
                                        提交
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Spin>
                </Content>
            </Layout>
        )
    }
}
export default Form.create()(Add)