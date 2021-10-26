const regex = /a[123]b/g;
const str = "a0b a1b a2b a3b a4b";
console.log( str.match(regex) ); // [ 'a1b', 'a2b', 'a3b' ]