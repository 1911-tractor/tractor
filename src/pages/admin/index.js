import React,{Component} from 'react'
import { Layout,PageHeader } from 'antd';

import './index.less'
import LeftNav from 'components/leftNav'
const { Header, Footer, Sider, Content } = Layout;
class Admin extends Component{
    render(){
        console.log(this)
        return(
            <div className='admin'>
                <Layout>
                    <Sider className='admin-left'>
                        <LeftNav ></LeftNav>
                    </Sider>
                    <Layout className='admin-right'>
                        <Content className='admin-right-middle'>
                            {this.props.children}
                        </Content>
                        <Footer className='admin-right-bottom'>
                            Footer
                        </Footer>
                    </Layout>
                </Layout>
            </div>
        )
    }
}
export default Admin