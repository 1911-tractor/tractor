import React,{Component} from 'react'
import {HashRouter,Route,Switch,Redirect} from 'react-router-dom'
import App from './App'
class RootRouter extends Component{
    render(){
        return(
            <App>
                <HashRouter>
                    <Switch>
                        <Redirect>
                            
                        </Redirect>
                    </Switch>
                </HashRouter>
            </App>
        )
    }
}

export default RootRouter