let students = [
    {
        name : "Ahmed",
        course : "CMPS 151"
    },
    {
        name : "Ahmed",
        course : "CMPS 251"
    },
    {
        name : "Samira",
        course : "CMPS 151"
    },
];

let cmps151Students = students.filter( student => student.course !== "CMPS 251");

//use filter to find all
let cmps151Students = students.filter( student => student.course === "CMPS 151");
console.log( "cmps151Students:", cmps151Students );

//First CMPS 151 student
let firstStudent = students.find((student) => student.course === "CMPS 151");
console.log( "firstStudent found:", firstStudent );

//Index of First CMPS 151 student
let studentIndex = students.findIndex((student) => student.course === "CMPS 151");
console.log( "studentIndex:", studentIndex );

students.splice(studentIndex, 1);

console.log( students );