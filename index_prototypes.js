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