import React, { useState } from "react";

import TaskForm from "./TaskForm";
import Task from "./Task";

export default () => {
    const [tasks, setTasks] = useState([
        {
            text: "Read about React",
            complete: false
        },
        {
            text: "Learn React State Management",
            isCompleted: false
        },
        {
            text: "Meet friend for lunch",
            isCompleted: false
        },
        {
            text: "Build really cool todo app",
            isCompleted: false
        }
    ]);

    const handleAddTask = text => {
        //Clone the tasks then add the new one
        const  newTasks = [...tasks, { text, complete: false }];
        setTasks(newTasks);
    };

    const handleCompleteTask = index => {
        //Clone the tasks then modify the task at index
        const newTasks = [...tasks];
        newTasks[index].complete = !newTasks[index].complete;
        setTasks(newTasks);
        console.log("handleCompleteTask", index, newTasks);
    };

  const handleDeleteTask = index => {
      const remainingTasks = tasks.filter((task, i) => i !== index);
      console.log("handleDelete", index, remainingTasks);
      setTasks(remainingTasks);
  };

  const handleClearTasks = () => setTasks([]);

  return (
    <div className="App">
      <TaskForm onAddTask={handleAddTask} />

      <h2>Todo list</h2>
      <ul className="task-list">
        {tasks.map((task, index) => (
          <Task key={index} task={task}
                onCompleteTask={() => handleCompleteTask(index)}
                onDeleteTask ={() => handleDeleteTask(index)}
          />
        ))}
      </ul>
      <hr />
      <button onClick={handleClearTasks}>Clear tasks</button>
    </div>
  );
}