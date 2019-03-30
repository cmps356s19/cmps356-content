import React, { Component } from 'react';
import './App.css';
import Welcome from "./components/Welcome.js";
import SignupForm from "./components/SignupForm.js";
import ToDoApp from "./components/ToDoApp";
import GitHubUsers from "./components/GitHubUsers";
import LoginForm from "./components/LoginForm";
import Counter from "./components/Counter";
import StudentsList from "./components/StudentsList";

function App() {
    return <div className="App">
        <Welcome appName='React Demo App'/>
        <Counter startValue={3} onChange={count => console.log(`Count from the child component: ${count}`)}/>
        <StudentsList students={['Fatima', 'Mouza', 'Sarah']}/>
        <br/>
        <SignupForm/>
        <LoginForm/>
        <ToDoApp/>
        <GitHubUsers/>
    </div>
}

export default App;
