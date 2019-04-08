import React, {useContext} from "react";
import UserContext from './UserContext';

function Welcome({appName}) {
    const css = {
        textAlign: 'center'
    };
    const {user, hello} = useContext(UserContext);
    console.log("From Welcome component", user);

    //Call the global function
    console.log("Hello from Welcome component");
    hello();

    return <>
        <h1 style={css}>Welcome to {appName}</h1>
        <div>You are login as: {user.username}</div>
    </>;
}

export default Welcome;