let fs = require('fs-extra');
let fetch = require("node-fetch");

let fetchProgram = () => {
    let url = "https://cmps356s19.github.io/data/ceng-programs.json";
    return fetch(url).then(response => response.json());
}

let readProgram = () => {
    return fs.readFile('data/cas-programs.json').then( data => JSON.parse(data) );
}

Promise.all([fetchProgram(), readProgram()]).then( programs => {
    //Flatten the array
    programs = programs.flat()
    console.log("\nQU Progams (CENG and CAS): ");
    console.log(programs);
});

Promise.race([fetchProgram(), readProgram()]).then( programs => {
    console.log("Results from race of getting CAS or CENG programs: ");
    console.log(programs);
});