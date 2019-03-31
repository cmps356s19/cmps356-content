import React from "react";

function Welcome(props) {
    const css = {
        textAlign: 'center'
    };
    return <h1 style={css}>Welcome to {props.appName}</h1>;
}

export default Welcome;