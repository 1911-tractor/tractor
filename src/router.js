import React,{Component} from 'react';
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import App from './App';
import Admin from 'pages/admin'
import Banner from 'pages/banner'
import BookUpdate from 'pages/admin/books/update'
import BookAdd from 'pages/admin/books/add'
import User from 'pages/admin/user'
import Login from 'pages/admin/login'


class RootRouter extends Component{
    render(){
        return(
            <App>
                <HashRouter>
                    <Switch>
                        <Redirect exact from='/' to='login'></Redirect>
                        <Route path='/admin' render={()=>{
                            return(
                                <Admin>
                                    <Route path = '/admin/user' component={User}></Route>

                                    <Route path = '/admin/books' component={Book}></Route>
                                    <Route path='/admin/banner' component={Banner}></Route>
                                    <Route path = '/admin/books/update' component={BookUpdate}></Route>
                                    <Route path = '/admin/books/add' component={BookAdd}></Route>

                                </Admin>
                            )
                            }}>
                        </Route>
                        <Route path='/login' component={Login}></Route>
                        
                    </Switch>
                </HashRouter>
            </App>
        )
    }
}

export default RootRouter