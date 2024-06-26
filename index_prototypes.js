//---------Property Descriptors (Attributes)-------------
let prsn = { name: 'Tim' };
console.log(prsn); // {name: 'Tim'}

for (let key in prsn)
  console.log(key); // name

let prs = { name: 'Tim' };
let objectBase = Object.getPrototypeOf(prs);
let descriptor = Object.getOwnPropertyDescriptor(objectBase, 'toString');
console.log(descriptor); // {writable: true, enumerable: false, configurable: true, value: ƒ}

//when we create our own objects we can set this attributes for our properties
let person = { name: 'Tim' };
Object.defineProperty(person, 'name', {
    writable: false, // it will become readonly
    enumerable: false, // this will not show up in object its keys []
    // enumerable: true, // ["name"]
    configurable: false // we cannot delete this property
});

person.name = 'John';
console.log(person); // {name: 'Tim'}

console.log(Object.keys(person)); // []

delete person.name;
console.log(person); // {name: 'Tim'}


//---------Constructor Prototypes-----------
function Circle(radius) {
    this.radius = radius;
}

const circle = new Circle(10);
// these are exactly the same
// Object.getPrototypeOf(circle);
// circle.__proto__; // (parent of circle) this is not good to write in a code
// Circle.prototype // (prototype of Ciecle constructor)

let obj = {};
// obj.__proto__ // this is objectBase
// Object.prototype

let array = [];
// array.__proto__ // this is arrayBase
// Array.prototype


// circle
// Circle {radius: 10}
//    radius: 10
//   [[Prototype]]: Object // circleBase
//     constructor: ƒ Circle(radius)
//     [[Prototype]]: Object // objectBase


//-----------Prototype vs Instance Members--------------
function Circle(radius) {
    //Instance members
    this.radius = radius;

    this.move = function() {
        console.log('move');
    }

    // this.move = function() {
    //     this.draw();
    //     console.log('move'); // draw   move
    // }
}

// Prototype members
Circle.prototype.draw = function() {
    this.move();
    console.log('draw'); // move  draw
}

// // Prototype members
// Circle.prototype.draw = function() {
//     console.log('draw');
// }

const c1 = new Circle(1);
const c2 = new Circle(1);

Circle.prototype.toString = function() {
    return 'Circle with radius ' + this.radius;
}
// c1.toString() // Circle with radius 1

//-----------Iterating Instance and Prototype Members---------

// Returns instance (we also call it own) members
console.log(Object.keys(c1)); // ['radius', 'move']

// Returns all members (instance/own + prototype)
for (let key in c1) console.log(key); // radius move draw toString

// c1.hasOwnProperty('radius') // true
// c1.hasOwnProperty('draw') // false