import React,{Component} from 'react'
import {Menu} from 'antd'
import {withRouter} from 'react-router-dom'
import navData from './navData'

const { SubMenu } = Menu;
class LeftNav extends Component{
    constructor(){
        super()
        this.state={
            data:[]
        }
    }
    componentDidMount(){
        //this.state.data=navData.data
        this.setState({data:navData.data})
    }
    jump=(path)=>{
        this.props.history.push(path)
    }
    renderItem(data){
        //  console.log()
        if(!data.length){ return '暂无数据' }
        return data.map((item)=>{
            if(item.children){
                return(
                    <SubMenu title={item.name}>
                        {this.renderItem(item.children)}
                    </SubMenu>
                )
            }else{
                return(
                    <Menu.Item key={item.key} onClick={this.jump.bind(this,item.path)}>
                        {item.name}
                    </Menu.Item>
                )
            }
        })
    }
    render(){
        return(
            <Menu theme='dark' mode='vertical'>
                {this.renderItem(this.state.data)}
            </Menu>
        )
    }
}
export default withRouter(LeftNav)