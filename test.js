function displayElements(arr) {

  // to update the iteration
  let n = 0;

  return {

      // implementing the next() function
      next() {

          if(n < arr.length) {
              return {
                  value: arr[n++],
                  done: false
              }
          }

          return {
              value: undefined,
              done: true
          }
      }
  }
}
debugger
const arr = ['h', 'e', 'l', 'l', 'o'];

const arrIterator = displayElements(arr);

console.log(arrIterator.next());
console.log(arrIterator.next());
console.log(arrIterator.next());
console.log(arrIterator.next());
console.log(arrIterator.next());
console.log(arrIterator.next());