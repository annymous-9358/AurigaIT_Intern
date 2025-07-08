// let promise = new Promise(function(resolve, reject){
        
//         resolve("Promise resolved successfully!");
// })
// console.log(promise);
/*************************.then .catch ***************************/

// let p1 = new Promise((resolve, reject) => {
//     console.log("Promise is pending...");
    
//     setTimeout(() => {
//         console.log("Promise resolved successfully!");
//         resolve("true");
//     }, 2000);
// })

// let p2 = new Promise((resolve, reject) => {
//     console.log("Promise is pending...");
    
//     setTimeout(() => {
//         console.log("Promise rejected successfully!");
//         reject(new Error("Promise rejected!"));
//     }, 2000);
// })
// p1.then((value) => {
//     console.log("Value from p1:", value);
// })
// p2.catch((error) => {
//     console.log("Error from p2:", error.message);
// })

/************************promise chaining */
// let p1 = new Promise((resolve, reject) => {

//             setTimeout(() => {
//                 console.log("Resolved after 2 seconds");
//                 resolve("Value from Promise 1");
//             }, 2000);
// })
// p1.then((value) => {
//     console.log(value)
//     let p2 = new Promise((resolve, reject) => {
//         setTimeout(() => {
//             console.log("Resolved after 2 seconds in Promise 2");
//             resolve("Value from Promise 2");
//         }, 2000);
//     });
//     return p2;
    
// }).then((value) => {
//     console.log("we are done");
// })

/************************promise.all */
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('The first promise has resolved');
//     resolve(10);
//   }, 1 * 1000);
// });
// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('The second promise has resolved');
//     resolve(20);
//   }, 2 * 1000);
// });
// const p3 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('The third promise has resolved');
//     resolve(30);
//   }, 3 * 1000);
// });

// Promise.all([p1, p2, p3]).then((results) => {
//   const total = results.reduce((p, c) => p + c);

//   console.log(`Results: ${results}`);
//   console.log(`Total: ${total}`);
// });
/**************promise.race*/
// const p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('The first promise has resolved');
//         resolve(10);
//     }, 1 * 1000);

// });

// const p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('The second promise has rejected');
//         reject(20);
//     }, 2 * 1000);
// });


// Promise.race([p1, p2])
//     .then(value => console.log(`Resolved: ${value}`))
//     .catch(reason => console.log(`Rejected: ${reason}`));

/**************promise.any*/
// const p1 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('Promise 1 rejected');
//     reject('error');
//   }, 1000);
// });

// const p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log('Promise 2 fulfilled');
//     resolve(2);
//   }, 2000);
// });

// const p = Promise.any([p1, p2]);
// p.then((value) => {
//   console.log('Returned Promise');
//   console.log(value);
// });
/***************promise.allSettled*/
// const p1 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('The first promise has resolved');
//         resolve(10);
//     }, 1 * 1000);

// });

// const p2 = new Promise((resolve, reject) => {
//     setTimeout(() => {
//         console.log('The second promise has rejected');
//         reject(20);
//     }, 2 * 1000);
// });

// Promise.allSettled([p1, p2])
//     .then((result) => {
//         console.log(result);
//     });
/**************promise.finally*/