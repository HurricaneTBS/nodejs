const numbers = [0, 1, 2, 3, 4, 5, 6];

numbers.push(...[10, 20]);
console.log(numbers);

numbers.splice(2, 2);
console.log(numbers);