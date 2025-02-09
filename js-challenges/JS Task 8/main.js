// Shape abstract constructor
function Shape() {
  if (this.constructor === Shape) {
      throw new Error("Can't instantiate abstract class!");
  }
  this.dimensions = 0;
}

// Rectangle constructor
Rectangle.counter = 0;
function Rectangle(width, height) {
  Shape.call(this);
  
  if (typeof width !== 'number' || typeof height !== 'number') {
      throw new Error('Width and height must be numbers');
  }
  
  this.width = width;
  this.height = height;
  Rectangle.counter++;
  
  if (Rectangle.counter > 1) {
      throw new Error("Can't instantiate more than 1 object!");
  }
}

// Set up Rectangle inheritance
Rectangle.prototype = Object.create(Shape.prototype);
Rectangle.prototype.constructor = Rectangle;

// Rectangle methods
Rectangle.prototype.getArea = function() {
  return this.width * this.height;
};

Rectangle.prototype.getPerimeter = function() {
  return 2 * (this.width + this.height);
};

Rectangle.prototype.toString = function() {
  return 'Rectangle[' + 
         this.width + ' Width, ' + 
         this.height + ' Height, ' + 
         this.getArea() + ' Area, ' + 
         this.getPerimeter() + ' Perimeter]';
};

Rectangle.getCounter = function() {
  return Rectangle.counter;
};

// Square constructor
function Square(side) {
  if (typeof side !== 'number') {
      throw new Error('Side must be a number');
  }
  Rectangle.call(this, side, side);
}

// Set up Square inheritance
Square.prototype = Object.create(Rectangle.prototype);
Square.prototype.constructor = Square;

// Square toString override
Square.prototype.toString = function() {
  return 'Square[' + 
         this.width + ' Side, ' + 
         this.getArea() + ' Area, ' + 
         this.getPerimeter() + ' Perimeter]';
};

// Testing
try {
  var rect = new Rectangle(4, 5);
  console.log(rect.getArea());        // 20
  console.log(rect.getPerimeter());   // 18
  console.log(rect.toString());       // Rectangle[4 Width, 5 Height, 20 Area, 18 Perimeter]
  console.log(Rectangle.getCounter()); // 1

  var square = new Square(4);
  console.log(square.getArea());      // 16
  console.log(square.toString());     // Square[4 Side, 16 Area, 16 Perimeter]
} catch (e) {
  console.error(e.message);
}