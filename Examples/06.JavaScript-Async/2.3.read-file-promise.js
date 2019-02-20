// Important traditional fs library to read/write files using callbacks
const fs = require('fs-extra');

/* Now let's make  a function named getStudent to return the details by studentId
 Because getStudent calls a async function itself becomes an async function
*/
function getStudent(studentId) {
    return fs.readFile('data/student.json').then(data => {
        const students = JSON.parse(data);
        return students.find(s => s.studentId === studentId);
    });
}

function getProgamName(programCode) {
    return fs.readFile('data/ceng-programs.json', data => {
        const programs = JSON.parse(data);
        return programs.find(p => p.code === programCode).name;
    });
}

const studentId = 2015009;
let student;
// This is an example Promises Chaining
getStudent(studentId).then( aStudent => {
    student = aStudent;
    console.log("\nStudent ", student);
    return getProgamName(student.program);
}).then( progamName => {
    console.log("\nProgram Name: ", progamName);
    student.program += ` - ${progamName}`;
    console.log("\nStudent with a full program name: ", student);
}).catch (err => {
    console.log(err);
});