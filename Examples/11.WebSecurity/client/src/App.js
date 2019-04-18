import React, {useState} from 'react';
import NavBar from './components/NavBar';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import ProtectedRoute from "./components/ProtectedRoute";
import LoginForm from "./components/LoginForm";
import Users from "./components/Users";
import Calculator from "./components/Calculator";
import Contacts from "./components/Contacts";
import {logout} from '../api-calls/AuthService'

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
        logout();
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
                       return <NavBar user={user} isAuthenticated={isAuthenticated}
                                      onLogout={handleLogout} {...props}
                       />
                   }}
            />

            <Switch>
                <Route path="/calculator" component={Calculator} />
                <ProtectedRoute path="/users" component={Users}
                                isAuthenticated={isAuthenticated}
                                user={user}
                                authorizedRoles={["Admin"]}
                />

                <ProtectedRoute path="/contacts" component={Contacts}
                                isAuthenticated={isAuthenticated}
                                user={user}
                />

                {/*<ProtectedRoute path="/addTrans" component={TransForm}
                                isAuthenticated={isAuthenticated}
                                user={user}
                                authorizedRoles={["Clerk"]}
                />*/}
            </Switch>
        </Router>
    )
}

/*    const [user, setUser] = useState({username: 'aFaleh', firstName: 'Ali', lastName: 'Faleh'});
    const hello = () => {
        console.log(`Hello ${user.firstName}`);
    }

    return (
         <UserContext.Provider value={ { user, hello } }>
            <div className="App">
                <Calculator />
            </div>
         </UserContext.Provider>
    );*/

