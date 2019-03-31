import React from "react";

function StudentsList({students}) {
    return <ul>
                {students.map( (student, i) =>
                    <li key={i}>{student}</li>
                )}
            </ul>
}

export default StudentsList;