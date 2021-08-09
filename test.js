#!/usr/bin/env node
console.log('hello ', process.argv[1]);

process.argv.forEach(item=>{
  console.log(item);
})