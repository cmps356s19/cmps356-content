import React, { useState } from "react";

export default function TaskForm ({ onAdd }) {
  const [todo, setTodo] = useState("");

  const handleTodoChange = e => setTodo(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();
    if (!todo) return;
    onAdd(todo);
    setTodo("");
  }

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" value={todo} placeholder="add a new todo..."
               onChange={handleTodoChange}/>
        <button type="submit">Add</button>
    </form>
  );
}
