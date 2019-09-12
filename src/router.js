import React,{Component} from 'react';
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import App from './App';
import Admin from './pages/Admin.js'
import User from './pages/user/user'
class RootRouter extends Component{
    render(){
        return(
            <App>
                <HashRouter>
                    <Switch>
                        <Redirect exact from='/' to='admin'></Redirect>
                        <Route path='/admin' render={()=>{
                            return(
                                <Admin>
                                    <Route path='/admin/user' component={User}></Route>
                                </Admin>
                            )
                        }}>
                        </Route>
                    </Switch>
                </HashRouter>
            </App>
        )
    }
}

export default RootRouter