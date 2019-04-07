import React, {useContext} from "react";
import UserContext from './UserContext';

function Welcome(props) {
    const css = {
        textAlign: 'center'
    };
    const {user, hello} = useContext(UserContext);
    console.log(user);

    //Call the global function
    hello();

    return <>
        <h1 style={css}>Welcome to {props.appName}</h1>
        <div>You are login as: {user.username}</div>
    </>;
}

export default Welcome;