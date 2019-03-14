import React from 'react';
import { BrowserRouter as Router,Switch,Route} from "react-router-dom";
import axios from 'axios';

import Nav from '@components/nav/index.js';
import Login from './login/index.js'
import Detail from './detail/index'
import '@scss/base.scss'
import './index.scss'

class Instagram extends React.Component {
    constructor(props) {
        super(props);
    }
    render () {
        return (
            <Router>
                <Switch>
                    <Route exact path="/" component={Detail}/>
                    <Route path="/login" component={Login} />
                    {/* <Route path="/about/:userId" component={About} />
                    <Route path="/about" component={About} />
                    <Route path="/accounts" component={Accounts}/>
                    <Route path="/search/:content" component={Search}/>
                    <Route path="/search" component={Search}/>
                    <Route component={NotFoundPage} /> */}
                </Switch>
            </Router>
        )
    }
}

export default Instagram;
