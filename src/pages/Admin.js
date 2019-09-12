import React,{Component} from 'react'
import {withRouter} from 'react-router-dom'
class Admin extends Component{
    jumpb(path){
             this.props.history.push(path)
    }
    render(){
        return(
            <div>
                <button onClick={this.jumpb.bind(this,'/admin/food')}></button>
                {this.props.children}
                <h1>这里是Admin</h1>
            </div>
        )
    }
}
export default withRouter(Admin)