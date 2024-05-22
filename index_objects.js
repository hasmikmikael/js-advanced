//-------Abstraction-----------

// In this example we have isses
// we should make defaultLocation and computeOptimumLocation private
function Circle(radius) {
    this.radius = radius;

    this.defaultLocation = { x: 0, y: 0 }; // this should be private

    this.computeOptimumLocation = function() { // this should be private
        // ...
    }

    this.draw = function() {
        this.computeOptimumLocation();

        console.log('draw');
    };
}

const circle = new Circle(10);
circle.computeOptimumLocation(); // this can put our object in a bad state
circle.draw(); // then here we can get a wierd error in runtime


//-----------Private Properties and Methods-----------
function CircleP(radius) {
    this.radius = radius;

    let defaultLocation = { x: 0, y: 0 }; // private

    let computeOptimumLocation = function(factor) { // private
        // ...
    }

    this.draw = function() {
        //let x, y;
        computeOptimumLocation(0.1);
        // defaultLocation
        // this.radius

        console.log('draw');
    };
}

const circleP = new CircleP(10);
circleP.draw(); // draw


//---------Getters and Setters-------------
//this is not a preferable solution
function CircleG(radius) {
    this.radius = radius;

    let defaultLocation = { x: 0, y: 0 };

    this.getDefaultLocation = function() {
        return defaultLocation;
    }

    this.draw = function() {
        console.log('draw');
    };
}

const circleG = new CircleG(10);
circleG.getDefaultLocation();
circleG.draw(); // draw

//this is better solution
function CircleGS(radius) {
    this.radius = radius;

    let defaultLocation = { x: 0, y: 0 };

    Object.defineProperty(this, 'defaultLocation', {
        get: function() {
            return defaultLocation;
        },
        set: function(value) {
            if (!value.x || !value.y)
              throw new Error('Invalid location');

              defaultLocation = value;
        }
    });
}

const circleGS = new CircleGS(10);
circleGS.defaultLocation;
//circleGS.defaultLocation = 1;
console.log(circleGS);