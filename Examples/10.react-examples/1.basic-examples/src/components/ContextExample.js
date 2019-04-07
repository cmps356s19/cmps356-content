import React, {useContext} from "react";
import ReactDOM from "react-dom";

// Create a Context
const NumberContext = React.createContext();
// It returns an object with 2 values:
// { Provider, Consumer }

function App() {
    // Use the Provider to make a value available to all
    // children and grandchildren
    return (
        <NumberContext.Provider value={42}>
            <div>
                <Display />
            </div>
        </NumberContext.Provider>
    );
}

function Display() {
    // Use the Consumer to grab the value from context
    // Notice this component didn't get any props!
    const value = useContext(NumberContext);
    return <div>The answer is {value}.</div>
}

ReactDOM.render(<App />, document.querySelector("#root"));