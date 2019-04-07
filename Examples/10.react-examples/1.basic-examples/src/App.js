import React, {useState} from 'react';
import Welcome from "./components/Welcome.js";
import SignupForm from "./components/SignupForm.js";
import GitHubUsers from "./components/GitHubUsers";
import LoginForm from "./components/LoginForm";
import Counter from "./components/Counter";
import FriendsList from "./components/FriendsList";
import NewsSearch from "./components/NewsSearch";
import Avatar from "./components/Avatar";
import FriendForm from "./components/FriendForm";
import UserContext from './components/UserContext';

function App() {
    const [friends, setFriends] = useState(['Fatima', 'Mouza', 'Sarah']);
    const [user, setUser] = useState({username: 'aFaleh', firstName: 'Ali', lastName: 'Faleh'});

    const handleAddFriend = name => {
        //friends.push(name);
        //console.log(friends);
        //Clone the friends then add the new one
        const  newFriends = [...friends, name];
        setFriends(newFriends);
    };

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
            <FriendForm onAddFriend={handleAddFriend} />
            <FriendsList friends={friends}/>
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
