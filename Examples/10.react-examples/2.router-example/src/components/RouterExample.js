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
            <Route path="/topics/:topicId" component={Topic} />
            <Route exact path="/topics/"
                render={() => <h3>Under construction. Come back later!!!</h3>}
            />
        </div>
    </Router>
  );
}

function Home(props) {
    console.log('props', props);
    return <h2>Home</h2>;
}

function About() {
    return <h2>About</h2>;
}

function Topic({ history, match }) {
    console.log("history:", history, "match:", match);
    return <>
        <h3>Received topic as route parameter: {match.params.topicId}</h3>
        <a href='' onClick={() => { history.push('/') }}>Back to Home</a>
    </>
}

export default RouterExample;

/*function Topics({ match, history, ...otherProps }) {
    //console.log('match', match);
    //console.log('otherProps', otherProps);
    return (
        <div>
            <h2>Topics</h2>
            <nav>
            <ul>
                <li>
                    <a href='#' onClick={e => { history.push('/') }}>Back to Home</a>
                </li>

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
}*/

