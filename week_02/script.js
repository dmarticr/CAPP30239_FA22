/* 
this is javascript example for
week 2.
*/

//inline comment

let num = 100; //integer

function foo(){
    let num2 = 200;
    console.log(num);
};

foo();

// let anonFun = function(){ //anonymous functions = without name
//     console.log("hello");
// }

let anonFun = () => console.log("hello"); //equivalent

// console.log(num2); no me deja porque esta adentro de una fn

let person = "Summer";

function people(peopleName){
    console.log("Hello " + peopleName);
};

people(person)

let arr = ["foo", 123, ["zar", "bar"]];

console.log(arr[1]);

// set item in array
arr[1] = "barbar";

console.log(arr[1]);

// Add item at end of array
arr.push("car");

// Remove item from array (index, deleteCount)
arr.splice(2, 1);
console.log(arr)

// for loops in array
for (let item of arr){
    console.log(item);
}


// foor loop with indexes
for (let i in arr){
    console.log(i + " " + arr[i]);
}

// loop through each item (= to above)
arr.forEach((item, i) => console.log(i + " " + item));

// Objects
let obj1 = {
    name: "Jill",
    age: 85,
    job: "Cactus Hunter", 
};

console.log(obj1.name);
console.log(obj1["name"]); //equivalent

obj1.job = "Barista";

console.log(obj1);

// loop through objects
for (let key in obj1){
    let value = obj1[key];
    console.log(`${key}: ${value}`);
}

console.log("Hello " + obj1["name"] + " " + foo);
console.log(`Hello ${obj1["name"]} ${num}`); // string literal

for (let i = 0; i < 10; i++){
    console.log(i);
}

let x = 75;

// traverse the DOM
let example = document.getElementById("example");

// add something 
example.innerHTML += "Hello world"; // += is to append