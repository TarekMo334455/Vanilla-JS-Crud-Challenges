function myFunction(param1, param2) {
    
    if (arguments.length !== 2) {
      throw new Error("This function requires exactly 2 parameters.");
    }
  
    
    console.log("Function executed successfully with parameters:", param1, param2);
  }


myFunction(1, 2); 
myFunction(1); 
myFunction(1, 2, 3); 


///////////////////////////////////////////////


function addNumbers(...numbers) {
  
  if (numbers.length === 0) {
    throw new Error("You must pass at least one number.");
  }


  numbers.forEach(num => {
    if (typeof num !== "number") {
      throw new Error("All parameters must be of type number.");
    }
  });

  
  return numbers.reduce((sum, num) => sum + num);
}

console.log(addNumbers(1, 2, 3, 4, 5));
console.log(addNumbers());
console.log(addNumbers(1, 2, "3", 4, 5));

///////////////////////////////////////////
const arr = [1, 2, 3, 4, 5];

const reverse = function() {
    return Array.from(arguments).reverse();
};


console.log(reverse.apply(this, arr));


console.log(reverse.call(this, ...arr));


const bound = reverse.bind(this);
console.log(bound(...arr));