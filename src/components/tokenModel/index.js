import React,{Component,Fragment} from 'react'
import {withRouter} from 'react-router-dom'
import {Card} from 'antd'
import {connect} from 'react-redux'
import ActionCreator from '../../store/actionCreator'
import {bindActionCreators} from 'redux'
import './index.less'
class TokenModel extends Component{
  back=()=>{
    //将模态框隐藏
    // this.props.test()
    this.props.changeModelState()
    //路由跳转到登录页面
    this.props.history.push('/login')
  }
    render(){
      console.log(this)
        return(
          <Fragment>
            {!this.props.modelState||<div className='tokenmodel'>
              <Card>
                <p>token丢失请重新登录</p>
                <button onClick={this.back}>返回登录</button>
              </Card>
            </div>}
          </Fragment>
        )
      }
}
// export default connect(state=>state,(dispatch)=>{
//   return{
//     test(){
//       dispatch(ActionCreator.changeModelState())
//     }
//   }
// }) (TokenModel)
let NewComponent=withRouter(TokenModel)
export default connect(state=>state,(dispatch)=>{
  return bindActionCreators(ActionCreator,dispatch)}) (NewComponent)