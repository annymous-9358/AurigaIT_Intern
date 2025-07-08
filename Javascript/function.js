// passing functions to another fn
function add(a, b) {
    return a + b;
}

let sum = add;

function average(a, b, fn) {
    return fn(a, b) / 2;
}

let result = average(10, 20, sum);

console.log(result);

// returning function from another function
function compareBy(propertyName) {
  return function (a, b) {
    let x = a[propertyName],
      y = b[propertyName];

    if (x > y) {
      return 1;
    } else if (x < y) {
      return -1;
    } else {
      return 0;
    }
  };
}
let products = [
  { name: 'iPhone', price: 900 },
  { name: 'Samsung Galaxy', price: 850 },
  { name: 'Sony Xperia', price: 700 },
];

// sort products by name
console.log('Products sorted by name:');
products.sort(compareBy('name'));

console.table(products);

// sort products by price
console.log('Products sorted by price:');
products.sort(compareBy('price'));
console.table(products);
// some more eg
function cmToIn(length) {
  return length / 2.54;
}

function inToCm(length) {
  return length * 2.54;
}

function convert(fn, length) {
  return fn(length);
}

let inches = convert(cmToIn, 10);
console.log(inches);

let cm = convert(inToCm, 10);
console.log(cm);

// anonymous function 
let show = function() {
    console.log('Anonymous function');
};

show();
// IIFE
(function() {
    console.log('IIFE');
})();
// Anonymous function Example
let person = {
    firstName: 'John',
    lastName: 'Doe'
};

(function () {
    console.log(person.firstName + ' ' + person.lastName);
})(person);
// arrow function
let showArrow = () => {
    console.log('Arrow function');
};

showArrow();
// recursive function
let countDown = function f(fromNumber) {
    console.log(fromNumber);

    let nextNumber = fromNumber - 1;

    if (nextNumber > 0) {
        f(nextNumber);
    }
}

let newYearCountDown = countDown;
countDown = null;
newYearCountDown(10);
//sum of n nautural numbers
function sumNatural(n) {
  if (n <= 1) {
    return n;
  }
  return n + sumNatural(n - 1);
}
console.log(sumNatural(5));
 sumNatural(4);
// function with default parameters
function greet(name = "Guest") {
    console.log(`Hello, ${name}!`);
}

greet("Alice");
greet();
