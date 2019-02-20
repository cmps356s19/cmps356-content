// Important traditional fs library to read/write files using callbacks
const fs = require('fs-extra');

/* Now let's make  a function named getStudent to return the details by studentId
 Because getStudent calls a async function itself becomes an async function
*/
async function getStudent(studentId)
{
    const data = await fs.readFile('data/student.json');
    const students = JSON.parse(data);
    return students.find(s => s.studentId === studentId);
}

async function getProgamName(programCode) {
    const data = await fs.readFile('data/ceng-programs.json');
    const programs = JSON.parse(data);
    return programs.find(p => p.code === programCode).name;
}

async function main() {
    try {
        const studentId = 2015009;
        const student = await getStudent(studentId);
        console.log("\nStudent ", student);

        const progamName = await getProgamName(student.program);
        console.log("\nProgram Name: ", progamName);
        student.program += ` - ${progamName}`;

        console.log("\nStudent with a full program name: ", student);
    }
    catch (err) {
        console.log(err);
    }
}

main();