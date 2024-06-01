//-------Creating your own Prototypical Inheritance-------
function Shape() {
}

Shape.prototype.duplicate = function() {
    console.log('duplicate');
}

function Circle(radius) {
    this.radius = radius;
}

// in the beginning circleBase was inherited from objectBase
// Circle.prototype = Object.create(Object.prototype);
// now we change circleBase to a new object that inherits from shapeBase/Shape.prototype
Circle.prototype = Object.create(Shape.prototype);

Circle.prototype.draw = function() {
    console.log('draw');
}

const s = new Shape();
const c = new Circle(1);


//--------Resetting the Constructor------------
function ShapeR() {
}

ShapeR.prototype.duplicate = function() {
    console.log('duplicate');
}

function CircleR(radius) {
    this.radius = radius;
}

// CircleR.prototype.console = CircleR;
// new CircleR.prototype.constructor() => new CircleR();
CircleR.prototype = Object.create(ShapeR.prototype);
CircleR.prototype.constructor = CircleR;

CircleR.prototype.draw = function() {
    console.log('draw');
}

const sp = new ShapeR();
const cl = new CircleR(1);


//-------Calling the Super Constructor--------
function Shape(color) {
    this.color = color;
}

Shape.prototype.duplicate = function() {
    console.log('duplicate');
}

function Circle(radius, color) {
    // Super Constructor
    Shape.call(this, color);

    this.radius = radius;
}

Circle.prototype = Object.create(Shape.prototype);
Circle.prototype.constructor = Circle;

Circle.prototype.draw = function() {
    console.log('draw');
}

const shape = new Shape();
const circle = new Circle(1, 'red'); // Circle {color: 'red', radius: 1}


//------Intermediate Function Inheritance-----------
function extend(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}

function Shape(color) {
    this.color = color;
}

Shape.prototype.duplicate = function() {
    console.log('duplicate');
}

function Circle(radius, color) {
    Shape.call(this, color);

    this.radius = radius;
}

extend(Circle, Shape);

Circle.prototype.draw = function() {
    console.log('draw');
}

function Square(size) {
    this.size = size;
}

extend(Square, Shape);

const sh = new Shape();
const ci = new Circle(1, 'red'); // Circle {color: 'red', radius: 1}
const sq = new Square(10);


//-------Method Overriding----------
function extend(Child, Parent) {
    Child.prototype = Object.create(Parent.prototype);
    Child.prototype.constructor = Child;
}

function Shape() {
}

Shape.prototype.duplicate = function() {
    console.log('duplicate');
}

function Circle() {
}

extend(Circle, Shape);

Circle.prototype.duplicate = function() {
    console.log('duplicate circle');
}

const cr = new Circle();
console.log(cr.duplicate()); // duplicate circle

// sometimes we would like to call the 
// implementation on the parent object as well
Circle.prototype.duplicate = function() {
    Shape.prototype.duplicate.call(this);
    console.log('duplicate circle');
}

const crc = new Circle();    // duplicate
console.log(cr.duplicate()); // duplicate circle


//----------------Polymorphism------------------
function Shape() {
}

Shape.prototype.duplicate = function() {
    console.log('duplicate');
}

function Circle() {
}

extend(Circle, Shape);

Circle.prototype.duplicate = function() {
    console.log('duplicate circle');
}

function Square() {
}

extend(Square, Shape);

Square.prototype.duplicate = function() {
    console.log('duplicate square');
}

const crcl = new Circle();

////////////////////
// const shapes = [
//     new Circle(),
//     new Square()
// ];

// //////////// instead of this
// for (let shape of shapes) {
//     if (shape.type === 'circle')
//       duplicateCircle();
//     else if (shape.type === 'square')
//       duplicateSquare();
//     else
//       duplicateShape();
// }

// //////////// using polymorphism we can write this code
// for (let shape of shapes)
//   shape.duplicate();