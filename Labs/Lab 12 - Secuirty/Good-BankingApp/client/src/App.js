import React from 'react';
import NavBar from './components/NavBar';
import Accounts from "./components/Accounts";
import TransForm from "./components/TransForm";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

export default function App() {
    return (
        <Router>
        <NavBar />
            <Switch>
                <Route exact path="/accts/:action" component={Accounts}/>
                <Route path="/addTrans" component={TransForm}/>
            </Switch>
        </Router>


    )
}