import React,{Component} from 'react'
class Admin extends Component{
    render(){
        return(
            <div>
                {this.props.children}
                <h1>这里是Admin</h1>
            </div>
        )
    }
}
export default Admin