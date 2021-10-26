const str = "abc abbc abbbc";
const res = str.match(/ab{1,5}c/g)
console.log(res);