import React, {useState, useEffect} from "react";

function Counter(props) {
    const [count, setCount] = useState(props.startValue);

    //This the first render only when the component is mounted
    useEffect(() => {
        console.log(`I just mounted!`)
    }, []);

    //Gets auto-executed on every render (i.e., every time count changes)
    useEffect(() => {
        console.log(`The count is now ${count}`);
        //Another way - Let the parent component know that count has changed
        //props.onChange(count);
    });

    const increment = () => {
        const updatedCount = count + 1;
        setCount(updatedCount);
        props.onChange(updatedCount);
    };

    const decrement = () => {
        const updatedCount = count + 1;
        setCount(updatedCount);
        props.onChange(updatedCount);
    };

    return <div>
        Count: {count} &nbsp;
        <button type="button" onClick={increment}>+</button>
        <button type="button" onClick={decrement}>-</button>
    </div>
}
export default Counter;