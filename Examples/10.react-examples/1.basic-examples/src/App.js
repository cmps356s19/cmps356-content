import React, {useState} from 'react';
import Welcome from "./components/Welcome.js";
import SignupForm from "./components/SignupForm.js";
import GitHubUsers from "./components/GitHubUsers";
import LoginForm from "./components/LoginForm";
import Counter from "./components/Counter";
import FriendsList from "./components/FriendsList";
import NewsSearch from "./components/NewsSearch";
import Avatar from "./components/Avatar";
import UserContext from './components/UserContext';

function App() {

    const [user, setUser] = useState({username: 'aFaleh', firstName: 'Ali', lastName: 'Faleh'});
    const hello = () => {
        console.log(`Hello ${user.firstName}`);
    }

    return (
     <UserContext.Provider value={ { user, hello } }>
        <div className="App">

            <Welcome appName='React Demo App'/>

            <div style={ {display: 'flex', justifyContent: 'space-around'} }>
                <Avatar username="erradi" picName='abdelkarim_erradi02.jpg'/>
                <Avatar username="abdulla-alali" picName='Abdulla_Khalid.jpg'/>
            </div>
            <Counter startValue={3} onChange={count => console.log(`Count from the child component: ${count}`)}/>
            <br />
            <FriendsList />
            <br/>
            <LoginForm/>
            <SignupForm/>
            <GitHubUsers/>
            <NewsSearch query='react'/>
        </div>
     </UserContext.Provider>
    );
}

export default App;
