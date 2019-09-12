import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
class Admin extends Component{

    jump=(path)=>{

        this.props.history.push(path)
    }
    render(){
        return(
            <div>
                <button onClick={this.jump.bind(this,'/admin/user')}>用户管理</button>
                <button onClick={this.jump.bind(this,'/login')}>按钮1</button>
                {this.props.children}
            </div>
        )
    }
}
export default withRouter(Admin)