const fs = require('fs');

fs.readFile("person.js",(err,res) => {
  console.log(res);
})