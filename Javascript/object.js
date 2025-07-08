// 'use strict';
// object literal
let person = {
    name: "Alice",
    age: 30,
    greet: function() {
        console.log(`Hello, my name is ${this.name}`);
    }
};

person.greet();
// data properties
// configurable, enumerable, writable


let person2= {};

Object.defineProperty(person2, 'ssn', {
    configurable: false,
    value: '012-38-9119'
});

delete person2.ssn;
// This will not delete the ssn property because it is not configurable
console.log(person.ssn);
// enumerable 
let person3 = {};
person3.age = 25;
person3.ssn = '012-38-9119';

for (let property in person3) {
    console.log(property);
}
// enumerable false
let person4 = {};
person4.age = 25;
person4.ssn = '012-38-9119';

Object.defineProperty(person4, 'ssn', {
    enumerable: false
});

for (let prop in person4) {
    console.log(prop);
}
// accessor properties
let person5 = {
    firstName: 'John',
    lastName: 'Doe'
}

Object.defineProperty(person5, 'fullName', {
    get: function () {
        return this.firstName + ' ' + this.lastName;
    },
    set: function (value) {
        let parts = value.split(' ');
        if (parts.length == 2) {
            this.firstName = parts[0];
            this.lastName = parts[1];
        } else {
            throw 'Invalid name format';
        }
    }
});

console.log(person5.fullName);
// define multiple properties
var product = {};

Object.defineProperties(product, {
    name: {
        value: 'Smartphone'
    },
    price: {
        value: 799
    },
    tax: {
        value: 1.1
    },
    netPrice: {
        get: function () {
            return this.price * (this.tax);
        }
    }
});

console.log('The net price of a ' + product.name + ' is ' + product.netPrice.toFixed(2) + ' USD');
// descriptor
let descriptor = Object.getOwnPropertyDescriptor(person4, 'ssn');
console.log(descriptor);
//  for..in loop
const items = [10 , 20, 30];
let total = 0;

for(const item in items) {
    total += items[item];
}
console.log(total); 