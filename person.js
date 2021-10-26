const regex = /^(0?[0-9]|1[0-9]|2[0-3]):(0?[0-9]|[1-5][0-9])$/
console.log( regex.test("7:9") ); // true
console.log( regex.test("23:59") ); // true
console.log( regex.test("02:07") ); // true