const {keys,values,entries} = Object

let obj = { a: 1, b: 2, c: 3 };

for (let key of keys(obj)) {
  console.log(key); // 'a', 'b', 'c'
}

for (let value of values(obj)) {
    console.log(value); // 'a', 'b', 'c'
}


entries(obj).forEach(item=>{
    console.log(item);
})