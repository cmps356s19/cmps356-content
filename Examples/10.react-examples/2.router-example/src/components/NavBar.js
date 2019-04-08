import React from 'react';
import {Link} from "react-router-dom";

export default function NavBar() {
    return (
        <nav>
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
                {/*<li> <a href="/about">About</a> </li>*/}
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/topics">Topics</Link>
                </li>
                <li>
                    <Link to="/topics/components">Components</Link>
                </li>
                <li>
                    <Link to="/topics/props-v-state">Props v. State</Link>
                </li>
            </ul>
        </nav>);
}