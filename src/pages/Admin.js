import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
class Admin extends Component{
    jumps=(path)=>{
        this.props.history.push(path)
    }
    render(){
        return(
            <div>
                {this.props.children}
                
                <button onClick={this.jumps.bind(this,'/login')}>按钮1</button>
               
            </div>
        )
    }
}
export default withRouter(Admin)