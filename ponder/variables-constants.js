// Constants and Variables
const PI = 3.14;
let radius = 3;

// area of a circle: PI * radius squared
console.log(PI * radius ** 2); // 28.26

// let can be reassigned
radius = 20;

console.log(PI * radius ** 2); // 1256

// PI = 3.14159; // would cause TypeError: Assignment to constant variable

// Type Coercion
const one = 1;
const two = '2';
console.log(one * two); // 2 (the string '2' is coerced into a number)

// Number() converts the string to a number on purpose
console.log(one + Number(two)); // 3

// Global and Block Scope
let course = "CSE131"; //global scope
if (true) {
    let student = "John";
    console.log(course);  //works just fine, course is global
    console.log(student); //works just fine, it's being accessed within the block
}
console.log(course); //works fine, course is global
console.log(student); //does not work, can't access a block variable outside the block
