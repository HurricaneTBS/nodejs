const person = {
  name:"张三",
  age:32
}


for (const [key,value] of Object.entries(person)) {
  console.log(`${key}-----${value}`);
}

for (const key in person) {
  if (Object.hasOwnProperty.call(person, key)) {
    const element = person[key];
    
  }
}