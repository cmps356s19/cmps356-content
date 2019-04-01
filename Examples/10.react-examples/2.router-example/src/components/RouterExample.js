import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import NavBar from "./NavBar";

function RouterExample() {
  return (
    <Router>
        <div>
            <NavBar />
            <hr />
            <Route exact path="/" component={Home} />
            <Route path="/about" component={About} />
            <Route path="/topics" component={Topics} />
        </div>
    </Router>
  );
}

function Home() {
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Topics({ match }) {
    return (
        <div>
            <h2>Topics</h2>
            <nav>
            <ul>
                <li>
                    <Link to={`${match.url}/rendering`}>Rendering with React</Link>
                </li>
                <li>
                    <Link to={`${match.url}/components`}>Components</Link>
                </li>
                <li>
                    <Link to={`${match.url}/props-v-state`}>Props v. State</Link>
                </li>
            </ul>
            </nav>

            <Route path={`${match.path}/:topicId`} component={Topic} />
            <Route
                exact
                path={match.path}
                render={() => <h3>Please select a topic.</h3>}
            />
        </div>
    );
}

function Topic({ match }) {
    return <h3>{match.params.topicId}</h3>
}

export default RouterExample;