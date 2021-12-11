import { square, sum } from "./js/utils.js";
const getInfo = require("./js/api.js"); // Uncaught ReferenceError: require is not defined

console.log(sum(10, 20));
console.log(square(10));

console.log(getInfo());
