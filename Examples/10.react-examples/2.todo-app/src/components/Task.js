import React from "react";

export default function Task ({ task, onToggleComplete, onDelete }) {
    return (
        <li className="task-item">
            <label style={{
                textDecoration: task.complete ? "line-through" : "",
                color: task.complete ? "#CCC" : "" }}>
                <input type="checkbox" checked={task.complete}  onChange={onToggleComplete} />
                {task.text}
            </label>
            <button type="button" className="close" onClick={onDelete}>❌</button>
        </li>
    );
}
