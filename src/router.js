import React,{Component} from 'react';
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom';
import App from './App';
import Admin from 'pages/admin'
import Book from 'pages/books'
import User from 'pages/user'
import Login from 'pages/login'

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
                                    <Route path = '/admin/user' component={User}></Route>
                                    <Route path = '/admin/books' component={Book}></Route>
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