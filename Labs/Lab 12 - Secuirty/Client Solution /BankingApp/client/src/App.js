import React, {useState} from 'react';
import NavBar from './components/NavBar';
import Accounts from "./components/Accounts";
import TransForm from "./components/TransForm";
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import LoginForm from "./components/LoginForm";

export default function App() {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [user, setUser] = useState();

    const handleLogin = (user) => {
        setIsAuthenticated(true);
        setUser(user);

        console.log("App.user", user);
        console.log("App.isAuthenticated", isAuthenticated);
    };

    const handleLogout = () => {
        setIsAuthenticated(false);
        setUser(null);
    };

    return (
        <Router>
            <Route path="/login"
                   render={(props) => {
                       return <LoginForm onLogin={handleLogin} {...props} />
                   }}
            />
            <Route path="/"
                   render={(props) => {
                       return <NavBar user={user}
                                      isAuthenticated={isAuthenticated}
                                      onLogout={handleLogout} {...props}
                       />
                   }}
            />
            <Switch>
                <ProtectedRoute path="/accts/:action" component={Accounts}
                                isAuthenticated={isAuthenticated}
                                user={user}
                                authorizedRoles={["Manager"]}
                />
                <ProtectedRoute path="/addTrans" component={TransForm}
                                isAuthenticated={isAuthenticated}
                                user={user}
                                authorizedRoles={["Clerk"]}
                />
            </Switch>
        </Router>
    )
}

