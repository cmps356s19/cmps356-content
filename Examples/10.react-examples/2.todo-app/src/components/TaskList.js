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
      text: "Write a React tutorial",
      complete: false
    }
  ]);

  const handleToggleComplete = idx => {
    const updatedTasks = tasks.map((task, i) =>
        i === idx ? { ...task, complete: !task.complete } : task
    );
    console.log("handleToggleComplete", idx, updatedTasks);
    setTasks(updatedTasks);
  };

  const handleAddTask = text => {
      setTasks([{ text, complete: false }, ...tasks]);
  };

  const handleDeleteTask = idx => {
      const remainingTasks = tasks.filter((task, i) => i !== idx);
      console.log("handleDelete", idx, remainingTasks);
      setTasks(remainingTasks);
  };

  const handleClearTasks = () => setTasks([]);

  return (
    <div className="App">
      <TaskForm onAdd={handleAddTask} />

      <h2>Todo list</h2>
      <ul className="task-list">
        {tasks.map((task, i) => (
          <Task key={i} task={task}
                onToggleComplete={() => handleToggleComplete(i)}
                onDelete ={() => handleDeleteTask(i)}
          />
        ))}
      </ul>
      <hr />
      <button onClick={handleClearTasks}>Clear tasks</button>
    </div>
  );
}