function orderBy(a, b) {
	//return (a == b) ? 0 : (a > b) ? 1 : -1;
	return a - b;
};

let numbers = [5, 4, 23, 2];

//Alphabetical Sort
numbers.sort();
console.log("Alphabetical Sort:", numbers.join(", "));

numbers.sort(orderBy);
console.log("Sorted:", numbers.join(", "));
//returns 2, 4, 5, 23

//better way
numbers.sort( (a, b) => a - b );
console.log("Sorted:", numbers.join(", "));