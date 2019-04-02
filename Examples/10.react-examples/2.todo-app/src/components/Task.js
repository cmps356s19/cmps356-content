import React from "react";

export default function Task ({ task, onCompleteTask, onDeleteTask }) {
    const taskStyle = {
        textDecoration: task.complete ? "line-through" : "",
        color: task.complete ? "#CCC" : ""
    };

    return (
        <li className="task-item">
            <label style={taskStyle}>
                <input type="checkbox" checked={task.complete}  onChange={onCompleteTask} />
                {task.text}
            </label>
            <button type="button" className="close" onClick={onDeleteTask}>❌</button>
        </li>
    );
}
