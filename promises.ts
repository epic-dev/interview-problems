/**
 * Implement delay using Promises
 */


export function delay<T>(ms: number, value?: T): Promise<T | undefined> {
  return new Promise(resolve => setTimeout(() => resolve(value), ms));
}

/**
 * Implement Promise.all
 */

function promiseAll(promises: Promise<any>[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const results: any[] = [];
        let completed = 0;

        promises.forEach((promise, index) => {
            promise.then((value) => {
                results[index] = value;
                completed++;
                if (completed === promises.length) {
                    resolve(results);
                }
            }).catch(reject);
        })
    })
}

// Example usage:
const p1 = delay(1000, 'Hello');
const p2 = Promise.resolve('World');
const p3 = Promise.resolve('!');

promiseAll([p1, p2, p3]).then(results => {
    console.log(results); // Output: ['Hello', 'World', '!']
}).catch(error => {
    console.error('Error:', error);
});

/**
 * Difficult version of Promise.all that handles nested Promises
 */
function promiseAllNested(promises: any[]): Promise<any[]> {
    return new Promise((resolve, reject) => {
        const results: any[] = [];
        let completed = 0;

        promises.forEach((promise, index) => {
            Promise.resolve(promise).then((value) => {
                results[index] = value;
                completed++;
                if (completed === promises.length) {
                    resolve(results);
                }
            }).catch(reject);
        })
    })
}

// Example usage:
const p4 = delay(1000, 'Hello');
const p5 = Promise.resolve('World');
const p6 = Promise.resolve(Promise.resolve('!'));

promiseAllNested([p4, p5, p6]).then(results => {
    console.log(results); // Output: ['Hello', 'World', '!']
}).catch(error => {
    console.error('Error:', error);
});

/**
 * Promise.all returns a promise that resolves when all of the promises in the iterable argument have resolved, or rejects with the reason of the first promise that rejects. It rejects with the reason of the first promise that rejects.
 * Promise.allSettled returns a promise that resolves after all of the given promises have either fulfilled or rejected, with an array of objects that each describes the outcome of each promise.
 * Promise.race returns a promise that fulfills or rejects as soon as one of the promises in an iterable fulfills or rejects, with the value or reason from that promise.
 * Promise.any returns a promise that fulfills as soon as any of the promises in the iterable fulfills, with the value of the fulfilled promise. If no promises in the iterable fulfill (if all of the given promises are rejected), then the returned promise is rejected with an AggregateError, a new subclass of Error that groups together individual errors.
 */