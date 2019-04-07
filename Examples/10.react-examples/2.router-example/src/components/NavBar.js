import React from 'react';
import {Link} from "react-router-dom";

export default function NavBar() {
    return (
        <nav>
            <ul>
                <li> <Link to="/">Home</Link> </li>
                {/*<li> <a href="/about">About</a> </li>*/}
                <li> <Link to="/about">About</Link> </li>
                <li> <Link to="/topics">Topics</Link> </li>
            </ul>
        </nav>);
}